export const leftNav = [
  {
    id: "1",
    title: "Giới thiệu",
    path: "/gioithieu",
  },
  {
    id: "2",
    title: "Đào tạo",
    path: "/daotao",
    drop: [
      {
        title: "ĐÀO TẠO ĐẠI HỌC",
        path: "/dao-tao-dai-hoc",
      },
      {
        title: "ĐÀO TẠO SAU ĐẠI HỌC",
        path: "/dao-tao-sau-dai-hoc",
      },
    ],
  },
  {
    id: "3",
    title: "Nghiên cứu khoa học",
    path: "/nckh",
  },
];

export const rightNav = [
  {
    id: "1",
    title: "Trang tin",
    path: "/tintuc",
    drop: [
      {
        title: "Tin tức",
        path: "/tintuc",
      },
      {
        title: "TUYỂN DỤNG",
        path: "/tuyendung",
      },
    ],
  },
  {
    id: "2",
    title: "Diễn đàn",
    path: "/diendan",
  },
  {
    id: "3",
    title: "Thành viên",
    // path: "/dangnhap",
    drop: [
      {
        title: "Đăng nhập",
        path: "/dangnhap",
      },
      {
        title: "Đăng ký",
        path: "/dangky",
      },
    ],
    drop2: [
      {
        title: "Thông tin tài khoản",
        path: "/thong-tin-ca-nhan",
      },
      {
        title: "Đăng xuất",
        path: "/",
      },
    ],
    drop3: [
      {
        title: "Thông tin tài khoản",
        path: "/thong-tin-ca-nhan",
      },
      {
        title: "Đăng tin",
        path: "/dangtin",
      },
      {
        title: "Đăng xuất",
        path: "/",
      },
    ],
    drop4: [
      {
        title: "Thông tin tài khoản",
        path: "/thong-tin-ca-nhan",
      },
      {
        title: "Đăng tin",
        path: "/dangtingiaovien",
      },
      {
        title: "Đăng xuất",
        path: "/",
      },
    ],
  },
];
