export const userMockData = {
  id: 'user-001',
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  phone: '0912345678',
  role: 'admin', // 'admin' hoặc 'user'
  position: 'Quản lý hệ thống',
  avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20business%20man%20portrait%20headshot%20clean%20white%20background%20confident%20smile%20formal%20attire%20modern%20office%20setting&width=200&height=200&seq=settings-user-avatar-001&orientation=squarish',
  joinDate: '15/01/2023'
};

export const pendingAccountsMockData = [
  {
    id: 'pending-001',
    name: 'Trần Thị Bình',
    email: 'tranthibinh@example.com',
    phone: '0923456789',
    position: 'Nhân viên kinh doanh',
    facility: 'Cơ sở Quận 1',
    registeredDate: '20/12/2024',
    registeredTime: '14:30'
  },
  {
    id: 'pending-002',
    name: 'Lê Văn Cường',
    email: 'levancuong@example.com',
    phone: '0934567890',
    position: 'Nhân viên tư vấn',
    facility: 'Cơ sở Quận 3',
    registeredDate: '19/12/2024',
    registeredTime: '09:15'
  },
  {
    id: 'pending-003',
    name: 'Phạm Thị Dung',
    email: 'phamthidung@example.com',
    phone: '0945678901',
    position: 'Nhân viên kinh doanh',
    facility: 'Cơ sở Quận 7',
    registeredDate: '18/12/2024',
    registeredTime: '16:45'
  }
];

export const settingsMockData = {
  language: 'vi',
  notifications: {
    push: true,
    email: true,
    sms: false
  },
  theme: 'light'
};