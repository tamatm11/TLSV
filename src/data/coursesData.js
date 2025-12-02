/** @format */

export const coursesData = [
  {
    id: "CALC101",
    title: "Giải Tích 1",
    description:
      "Nắm vững giải tích từ cơ bản đến nâng cao bao gồm giới hạn, đạo hàm và tích phân.",
    longDescription:
      "Khóa học giải tích toàn diện này bao gồm mọi thứ từ các khái niệm cơ bản đến các ứng dụng nâng cao. Hoàn hảo cho sinh viên đại học năm nhất chuẩn bị cho các kỳ thi.",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
    price: 50000,
    originalPrice: 100000,
    level: "Trung Cấp",
    duration: "12 tuần",
    lessons: 48,
    rating: 4.8,
    students: "2,500+",
    learningOutcomes: [
      "Hiểu rõ giới hạn và tính liên tục",
      "Thành thạo các kỹ thuật đạo hàm",
      "Áp dụng các phương pháp tích phân",
      "Giải quyết các bài toán giải tích thực tế",
      "Chuẩn bị cho toán cao cấp đại học",
      "Xây dựng kỹ năng giải quyết vấn đề mạnh mẽ",
    ],
    curriculum: [
      {
        title: "Học phần 1: Hàm số và Giới hạn",
        topics: [
          "Giới thiệu về hàm số",
          "Các loại hàm số",
          "Giới hạn và tính liên tục",
          "Định lý giới hạn",
        ],
      },
      {
        title: "Học phần 2: Đạo hàm",
        topics: [
          "Định nghĩa đạo hàm",
          "Quy tắc tính đạo hàm",
          "Quy tắc chuỗi",
          "Ứng dụng của đạo hàm",
        ],
      },
      {
        title: "Học phần 3: Tích phân",
        topics: [
          "Nguyên hàm",
          "Kỹ thuật tích phân",
          "Tích phân xác định",
          "Ứng dụng của tích phân",
        ],
      },
      {
        title: "Học phần 4: Chủ đề nâng cao",
        topics: [
          "Chuỗi và dãy số",
          "Giải tích đa biến",
          "Phương trình vi phân",
          "Ôn thi cuối kỳ",
        ],
      },
    ],
    instructor: {
      name: "TS. Nguyễn Văn Minh",
      title: "Tiến sĩ Toán học, 15 năm kinh nghiệm giảng dạy",
      bio: "Tiến sĩ Minh đã giảng dạy toán học tại các trường đại học hàng đầu và giúp hàng nghìn sinh viên xuất sắc trong môn giải tích. Phương pháp giảng dạy của ông tập trung vào việc xây dựng tư duy trực quan và kỹ năng giải quyết vấn đề thực tế.",
      courses: 8,
      students: "15,000+",
      rating: 4.9,
    },
  },
  {
    id: "PHYS201",
    title: "Vật Lý 1 Đại Cương",
    description:
      "Khóa học vật lý toàn diện bao gồm cơ học, chuyển động, năng lượng và nguyên lý nhiệt động lực học.",
    longDescription:
      "Đi sâu vào cơ học cổ điển và nhiệt động lực học với các bài học tương tác, ví dụ thực tế và các bài tập thực hành phong phú.",
    image:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=600&fit=crop",
    price: 49000,
    originalPrice: 200000,
    level: "Trung cấp",
    duration: "10 tuần",
    lessons: 40,
    rating: 4.7,
    students: "1,800+",
    learningOutcomes: [
      "Hiểu các định luật Newton về chuyển động",
      "Nắm vững khái niệm năng lượng và động lượng",
      "Áp dụng nguyên lý nhiệt động lực học",
      "Giải quyết các bài toán vật lý phức tạp",
      "Chuẩn bị cho các kỳ thi vật lý",
      "Phát triển tư duy phân tích",
    ],
    curriculum: [
      {
        title: "Học phần 1: Động học",
        topics: [
          "Chuyển động một chiều",
          "Chuyển động hai chiều",
          "Chuyển động ném",
          "Chuyển động tròn",
        ],
      },
      {
        title: "Học phần 2: Động lực học",
        topics: [
          "Định luật Newton",
          "Ma sát và lực cản",
          "Công và năng lượng",
          "Các định luật bảo toàn",
        ],
      },
      {
        title: "Học phần 3: Nhiệt động lực học",
        topics: [
          "Nhiệt độ và nhiệt lượng",
          "Các định luật nhiệt động lực học",
          "Động cơ nhiệt",
          "Entropy",
        ],
      },
      {
        title: "Học phần 4: Ứng dụng",
        topics: [
          "Ứng dụng thực tế",
          "Chiến lược giải quyết vấn đề",
          "Ôn tập và thực hành",
          "Chuẩn bị thi",
        ],
      },
    ],
    instructor: {
      name: "GS. Trần Thị Lan",
      title: "Giáo sư Vật lý, Cựu Huấn luyện viên Olympic",
      bio: "Giáo sư Lan đã huấn luyện nhiều người chiến thắng Olympic vật lý và chuyên làm cho các khái niệm phức tạp trở nên dễ tiếp cận với mọi sinh viên.",
      courses: 6,
      students: "10,000+",
      rating: 4.8,
    },
  },
  {
    id: "CHEM301",
    title: "Hóa Hữu Cơ",
    description:
      "Học hóa hữu cơ từ đầu bao gồm cấu trúc phân tử, phản ứng và cơ chế.",
    longDescription:
      "Hướng dẫn hoàn chỉnh về hóa hữu cơ bao gồm danh pháp, hóa học lập thể, cơ chế phản ứng và chiến lược tổng hợp.",
    image:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=600&fit=crop",
    price: 49000,
    originalPrice: 200000,
    level: "Nâng cao",
    duration: "14 tuần",
    lessons: 56,
    rating: 4.9,
    students: "1,200+",
    learningOutcomes: [
      "Thành thạo danh pháp hữu cơ",
      "Hiểu cơ chế phản ứng",
      "Dự đoán kết quả phản ứng",
      "Tổng hợp các hợp chất hữu cơ",
      "Phân tích cấu trúc phân tử",
      "Xuất sắc trong các kỳ thi hóa hữu cơ",
    ],
    curriculum: [
      {
        title: "Học phần 1: Cơ sở Hóa hữu cơ",
        topics: [
          "Cấu trúc nguyên tử",
          "Liên kết hóa học",
          "Danh pháp",
          "Đồng phân",
        ],
      },
      {
        title: "Học phần 2: Cơ chế phản ứng",
        topics: [
          "Phản ứng thế",
          "Phản ứng tách",
          "Phản ứng cộng",
          "Phản ứng chuyển vị",
        ],
      },
      {
        title: "Học phần 3: Nhóm chức",
        topics: ["Ancol và ete", "Andehit và xeton", "Axit cacboxylic", "Amin"],
      },
      {
        title: "Học phần 4: Chủ đề nâng cao",
        topics: [
          "Phổ học",
          "Chiến lược tổng hợp",
          "Hóa học lập thể",
          "Phân tử sinh học",
        ],
      },
    ],
    instructor: {
      name: "TS. Lê Hoàng Nam",
      title: "Tiến sĩ Hóa hữu cơ, Nhà nghiên cứu",
      bio: "Tiến sĩ Nam kết hợp sự xuất sắc trong học thuật với kinh nghiệm trong ngành để cung cấp cho sinh viên cả kiến thức lý thuyết và ứng dụng thực tế của hóa hữu cơ.",
      courses: 5,
      students: "8,000+",
      rating: 4.9,
    },
  },
  {
    id: "ALGE101",
    title: "Đại Số Tuyến Tính",
    description:
      "Khóa học hoàn chỉnh về đại số tuyến tính bao gồm vector, ma trận, trị riêng và biến đổi tuyến tính.",
    longDescription:
      "Khóa học đại số tuyến tính thiết yếu cho sinh viên toán học, kỹ thuật và khoa học dữ liệu. Bao gồm lý thuyết và ứng dụng.",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop",
    price: 49000,
    originalPrice: 200000,
    level: "Trung cấp",
    duration: "8 tuần",
    lessons: 32,
    rating: 4.6,
    students: "3,000+",
    learningOutcomes: [
      "Hiểu không gian vector",
      "Thành thạo các phép toán ma trận",
      "Tính toán trị riêng và vector riêng",
      "Áp dụng biến đổi tuyến tính",
      "Giải hệ phương trình",
      "Sử dụng đại số tuyến tính trong ứng dụng",
    ],
    curriculum: [
      {
        title: "Học phần 1: Vector và Ma trận",
        topics: [
          "Phép toán vector",
          "Đại số ma trận",
          "Định thức",
          "Ma trận nghịch đảo",
        ],
      },
      {
        title: "Học phần 2: Hệ tuyến tính",
        topics: [
          "Khử Gaussian",
          "Phương trình ma trận",
          "Không gian vector",
          "Độc lập tuyến tính",
        ],
      },
      {
        title: "Học phần 3: Trị riêng",
        topics: [
          "Trị riêng và vector riêng",
          "Chéo hóa",
          "Trực giao",
          "Quá trình Gram-Schmidt",
        ],
      },
      {
        title: "Học phần 4: Ứng dụng",
        topics: [
          "Biến đổi tuyến tính",
          "Ứng dụng trong khoa học dữ liệu",
          "Đồ họa máy tính",
          "Ứng dụng kỹ thuật",
        ],
      },
    ],
    instructor: {
      name: "PGS. Phạm Minh Đức",
      title: "Phó Giáo sư, Chuyên gia Khoa học Dữ liệu",
      bio: "PGS. Đức chuyên về toán ứng dụng và có kinh nghiệm giảng dạy đại số tuyến tính cho sinh viên kỹ thuật và khoa học máy tính.",
      courses: 7,
      students: "12,000+",
      rating: 4.7,
    },
  },
  {
    id: "BIOL101",
    title: "Sinh Học Phân Tử Cơ Bản",
    description:
      "Khám phá cơ sở phân tử của sự sống bao gồm DNA, RNA, protein và các quá trình tế bào.",
    longDescription:
      "Khóa học sinh học phân tử toàn diện bao gồm biểu hiện gen, tổng hợp protein, tín hiệu tế bào và các kỹ thuật công nghệ sinh học hiện đại.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    price: 99000,
    originalPrice: 300000,
    level: "Trung cấp",
    duration: "10 tuần",
    lessons: 40,
    rating: 4.8,
    students: "1,500+",
    learningOutcomes: [
      "Hiểu cấu trúc và sao chép DNA",
      "Nắm vững cơ chế biểu hiện gen",
      "Học về tổng hợp protein",
      "Khám phá tín hiệu tế bào",
      "Nghiên cứu công nghệ sinh học hiện đại",
      "Chuẩn bị cho các kỳ thi sinh học",
    ],
    curriculum: [
      {
        title: "Học phần 1: DNA và Gen",
        topics: ["Cấu trúc DNA", "Sao chép DNA", "Cấu trúc gen", "Đột biến"],
      },
      {
        title: "Học phần 2: Biểu hiện gen",
        topics: ["Phiên mã", "Xử lý RNA", "Dịch mã", "Điều hòa gen"],
      },
      {
        title: "Học phần 3: Quá trình tế bào",
        topics: [
          "Chu kỳ tế bào",
          "Tín hiệu tế bào",
          "Apoptosis",
          "Trao đổi chất tế bào",
        ],
      },
      {
        title: "Học phần 4: Công nghệ sinh học",
        topics: [
          "DNA tái tổ hợp",
          "PCR và giải trình tự",
          "Kỹ thuật di truyền",
          "Ứng dụng",
        ],
      },
    ],
    instructor: {
      name: "TS. Nguyễn Thị Hương",
      title: "Tiến sĩ Sinh học Phân tử",
      bio: "Tiến sĩ Hương mang kinh nghiệm nghiên cứu tiên tiến vào lớp học, làm cho sinh học phân tử trở nên dễ tiếp cận và thú vị đối với mọi sinh viên.",
      courses: 4,
      students: "6,500+",
      rating: 4.8,
    },
  },
  {
    id: "STAT201",
    title: "Xác Suất & Thống Kê",
    description:
      "Nắm vững phân tích thống kê và lý thuyết xác suất với các ứng dụng thực tế và phân tích dữ liệu.",
    longDescription:
      "Khóa học thống kê hoàn chỉnh bao gồm thống kê mô tả, phân phối xác suất, kiểm định giả thuyết và phân tích hồi quy.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    price: 99000,
    originalPrice: 200000,
    level: "Trung cấp",
    duration: "9 tuần",
    lessons: 36,
    rating: 4.7,
    students: "2,200+",
    learningOutcomes: [
      "Hiểu lý thuyết xác suất",
      "Thành thạo các phân phối thống kê",
      "Thực hiện kiểm định giả thuyết",
      "Thực hiện phân tích hồi quy",
      "Phân tích dữ liệu thực tế",
      "Đưa ra quyết định dựa trên dữ liệu",
    ],
    curriculum: [
      {
        title: "Học phần 1: Thống kê mô tả",
        topics: [
          "Các loại dữ liệu",
          "Các số đo xu hướng trung tâm",
          "Các số đo độ phân tán",
          "Trực quan hóa dữ liệu",
        ],
      },
      {
        title: "Học phần 2: Xác suất",
        topics: [
          "Cơ bản về xác suất",
          "Xác suất có điều kiện",
          "Định lý Bayes",
          "Biến ngẫu nhiên",
        ],
      },
      {
        title: "Học phần 3: Phân phối",
        topics: [
          "Phân phối chuẩn",
          "Phân phối nhị thức",
          "Phân phối Poisson",
          "Phân phối mẫu",
        ],
      },
      {
        title: "Học phần 4: Suy diễn thống kê",
        topics: [
          "Kiểm định giả thuyết",
          "Khoảng tin cậy",
          "Phân tích hồi quy",
          "ANOVA",
        ],
      },
    ],
    instructor: {
      name: "GS. Võ Thành Tâm",
      title: "Giáo sư Thống kê, Chuyên gia phân tích dữ liệu",
      bio: "Giáo sư Tâm có hơn 20 năm kinh nghiệm trong giáo dục thống kê và đã giúp hàng nghìn sinh viên nắm vững tư duy thống kê.",
      courses: 9,
      students: "18,000+",
      rating: 4.8,
    },
  },
];
