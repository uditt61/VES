import { Enquiry } from '../models/Enquiry.js';
import { College } from '../models/College.js';
import { Course } from '../models/Course.js';
import { Grievance } from '../models/Grievance.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class DashboardController {
  static async getStats(req, res, next) {
    try {
      const counsellorFilter =
        req.user.role === 'COUNSELLOR' ? { assignedCounsellor: req.user.id } : {};

      const [
        totalEnquiries,
        newEnquiries,
        followUpEnquiries,
        contactedEnquiries,
        admissionsCompleted,
        openGrievances,
        totalColleges,
        totalCourses,
        statusCounts,
        recentEnquiries,
      ] = await Promise.all([
        Enquiry.countDocuments(counsellorFilter),
        Enquiry.countDocuments({ ...counsellorFilter, status: 'New' }),
        Enquiry.countDocuments({ ...counsellorFilter, status: 'Follow-up' }),
        Enquiry.countDocuments({ ...counsellorFilter, status: 'Contacted' }),
        Enquiry.countDocuments({ ...counsellorFilter, status: 'Admission Completed' }),
        Grievance.countDocuments({ status: { $in: ['Open', 'Under Review', 'In Progress'] } }),
        College.countDocuments({ isActive: true }),
        Course.countDocuments({ isActive: true }),
        Enquiry.aggregate([
          { $match: counsellorFilter },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),
        Enquiry.find(counsellorFilter)
          .populate('preferredCollege', 'name')
          .populate('preferredCourse', 'name degreeType')
          .populate('assignedCounsellor', 'name')
          .sort({ createdAt: -1 })
          .limit(6)
          .lean(),
      ]);

      // Map status counts to an easy lookup object
      const statusMap = {
        New: 0,
        Contacted: 0,
        'Follow-up': 0,
        Interested: 0,
        'Application Started': 0,
        'Admission Completed': 0,
        'Not Interested': 0,
        Closed: 0,
      };
      statusCounts.forEach((item) => {
        if (item._id) statusMap[item._id] = item.count;
      });

      // Monthly enquiry trends for the last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      sixMonthsAgo.setDate(1);

      const monthlyAgg = await Enquiry.aggregate([
        {
          $match: {
            ...counsellorFilter,
            createdAt: { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]);

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyTrends = monthlyAgg.map((item) => ({
        label: `${monthNames[item._id.month - 1]} ${item._id.year}`,
        count: item.count,
      }));

      // Top 5 colleges by interest
      const topCollegesAgg = await Enquiry.aggregate([
        { $match: counsellorFilter },
        { $group: { _id: '$preferredCollege', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'colleges',
            localField: '_id',
            foreignField: '_id',
            as: 'college',
          },
        },
        { $unwind: { path: '$college', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            name: { $ifNull: ['$college.name', 'Unspecified'] },
            count: 1,
          },
        },
      ]);

      const conversionRate = totalEnquiries > 0
        ? ((admissionsCompleted / totalEnquiries) * 100).toFixed(1)
        : '0.0';

      return ApiResponse.success(
        res,
        {
          metrics: {
            totalEnquiries,
            newEnquiries,
            followUpEnquiries,
            contactedEnquiries,
            admissionsCompleted,
            conversionRate: `${conversionRate}%`,
            openGrievances,
            totalColleges,
            totalCourses,
          },
          statusDistribution: statusMap,
          monthlyTrends,
          topColleges: topCollegesAgg,
          recentEnquiries,
        },
        'Dashboard statistics retrieved'
      );
    } catch (error) {
      next(error);
    }
  }
}
