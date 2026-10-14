import { Project, Service, ProcessStep, Value, TeamMember, TechItem, Testimonial, FAQItem, PricingPlan } from "./types";

export const SERVICES_DATA: Record<"vi" | "en", Service[]> = {
  vi: [
    {
      id: "product_design",
      title: "Thiết Kế Sản Phẩm",
      description: "Chúng tôi thiết kế giao diện dễ sử dụng, rõ ràng và tập trung vào trải nghiệm thực tế của người dùng.",
      details: [
        "Xây dựng Bản đồ Trải nghiệm Người dùng",
        "Thiết kế các bản mẫu thử nghiệm trực quan",
        "Hệ thống thiết kế và bộ nhận diện thương hiệu",
        "Đánh giá chất lượng giao diện và trải nghiệm"
      ],
      iconName: "PenTool"
    },
    {
      id: "web_development",
      title: "Phát Triển Website",
      description: "Chúng tôi xây dựng các trang web tải nhanh, dễ tiếp cận trên mọi thiết bị và được tối ưu hóa tốt cho các công cụ tìm kiếm.",
      details: [
        "Tối ưu hóa cấu trúc chuẩn SEO",
        "Thiết kế giao diện linh hoạt với Tailwind CSS",
        "Kết xuất trang nhanh chóng từ máy chủ",
        "Đảm bảo trang web dễ sử dụng cho mọi người"
      ],
      iconName: "Globe"
    },
    {
      id: "fullstack_engineering",
      title: "Kỹ Thuật Full Stack",
      description: "Chúng tôi xây dựng hệ thống máy chủ hoạt động ổn định, bảo mật cao và cơ sở dữ liệu có khả năng chịu tải tốt.",
      details: [
        "Xây dựng các cổng kết nối API ổn định",
        "Thiết kế cấu trúc cơ sở dữ liệu ngăn nắp",
        "Đóng gói ứng dụng bằng Docker và triển khai lên đám mây",
        "Thiết lập quy trình triển khai tự động"
      ],
      iconName: "Database"
    },
    {
      id: "ai_integration",
      title: "Tích Hợp AI",
      description: "Chúng tôi tích hợp các công nghệ trí tuệ nhân tạo và mô hình ngôn ngữ lớn vào hệ thống web của bạn một cách thực tế và hiệu quả.",
      details: [
        "Tìm kiếm thông minh qua cơ sở dữ liệu",
        "Ứng dụng trợ lý AI thông minh",
        "Hệ thống truy xuất dữ liệu thông minh",
        "Kiến trúc gợi ý thông tin bảo mật"
      ],
      iconName: "Cpu"
    },
    {
      id: "technical_consulting",
      title: "Tư Vấn Kỹ Thuật",
      description: "Chúng tôi hỗ trợ kiểm tra mã nguồn, tối ưu hóa cơ sở dữ liệu và tư vấn nâng cấp hệ thống phần mềm của bạn.",
      details: [
        "Bản vẽ thiết kế hệ thống phần mềm",
        "Tối ưu hóa và dọn dẹp cơ sở dữ liệu",
        "Cải tiến hệ thống mã nguồn cũ",
        "Kiểm tra tốc độ hiển thị giao diện"
      ],
      iconName: "Terminal"
    },
    {
      id: "maintenance_hotfix",
      title: "Vận Hành & Vá Lỗi (Maintenance & Hotfix)",
      description: "Chúng tôi duy trì hệ thống hoạt động liên tục, xử lý sự cố khẩn cấp và khắc phục lỗi trực tiếp (hotfix) lập tức cho các cửa hàng trực tuyến như Sukajan Store.",
      details: [
        "Hỗ trợ khắc phục sự cố khẩn cấp 24/7",
        "Tự động sao lưu và bảo vệ cơ sở dữ liệu",
        "Theo dõi hiệu suất và trạng thái máy chủ",
        "Bảo trì và vá lỗi bảo mật định kỳ"
      ],
      iconName: "Wrench"
    }
  ],
  en: [
    {
      id: "product_design",
      title: "Product Design",
      description: "We translate business needs into simple, intuitive user interfaces that emphasize clear layout and functional simplicity.",
      details: [
        "User Journey Mapping",
        "Interactive Prototypes",
        "Design Systems and Brand Identity",
        "UI UX Auditing"
      ],
      iconName: "PenTool"
    },
    {
      id: "web_development",
      title: "Web Development",
      description: "We build reliable and fast web applications optimized for search engines and performance.",
      details: [
        "SEO Friendly Architecture",
        "Fluid Styling with Tailwind CSS",
        "Static and Server Side Rendering",
        "Accessibility Standards Compliance"
      ],
      iconName: "Globe"
    },
    {
      id: "fullstack_engineering",
      title: "Full Stack Engineering",
      description: "We design stable backend networks, secure cloud setups, and database schemas built for growth.",
      details: [
        "Scalable REST and GraphQL APIs",
        "Relational Database Schema Design",
        "Dockerization and Cloud Deployments",
        "Automated Deployment Pipelines"
      ],
      iconName: "Database"
    },
    {
      id: "ai_integration",
      title: "AI Integration",
      description: "We connect large language models and smart features into your existing web platforms realistically.",
      details: [
        "Smart Search Tools",
        "Gemini API Web Workflows",
        "Retrieval Augmented Generation",
        "Secure Prompt Frameworks"
      ],
      iconName: "Cpu"
    },
    {
      id: "technical_consulting",
      title: "Technical Consulting",
      description: "We help teams audit codebase structure, optimize databases, and plan scaling paths.",
      details: [
        "System Architecture Blueprints",
        "Database Performance Tuning",
        "Legacy Codebase Modernization",
        "Frontend Audits"
      ],
      iconName: "Terminal"
    },
    {
      id: "maintenance_hotfix",
      title: "Maintenance & Hotfix Support",
      description: "We secure seamless operational uptime, resolve critical bugs, and push production hotfixes instantly for live stores like Sukajan Store.",
      details: [
        "24/7 Incident and Crash Hotfix Response",
        "Automated DB Backups & Cloud Protection",
        "Continuous Server Health & Speed Monitoring",
        "Regular Framework Security Upgrades"
      ],
      iconName: "Wrench"
    }
  ]
};

export const PROJECTS_DATA: Record<"vi" | "en", Project[]> = {
  vi: [
    {
      id: "sukajan_store",
      title: "Sukajan Store",
      client: "PhiTruong",
      category: "Thương mại điện tử và Nhận diện Thương hiệu",
      shortStory: "Chúng tôi thiết kế và xây dựng website thương mại điện tử Sukajan cho khách hàng, giúp họ đưa thương hiệu lên môi trường trực tuyến hoạt động ổn định và hỗ trợ thanh toán an toàn. Dự án có sự tham gia của Duong Phu Dong, Huynh Quang Dong và Ho Quang Huy.",
      technologies: ["Next.js", "PostgreSQL", "TailwindCSS", "Vercel"],
      timeline: "3 Tuần",
      outcome: "Bàn giao cửa hàng trực tuyến chạy mượt mà, đạt điểm tối ưu hóa SEO 98%, bàn giao đầy đủ mã nguồn và cam kết bảo hành lâu dài.",
      coverImage: "sukajan",
      metrics: "SEO 98% và hơn 15,000 truy cập",
      liveUrl: "https://sukajanrandomphitruong.com/"
    },
    {
      id: "pudo_code_system",
      title: "PuDo Code System",
      client: "Founder (Duong Phu Dong)",
      category: "Hệ thống chỉ định AI Agent và Cấu trúc Workspace",
      shortStory: "Hệ thống quy chuẩn hóa chỉ thị hệ thống và sơ đồ hóa mã nguồn do Founder Duong Phu Dong phát triển, giúp các lập trình viên AI (Coding Agent) nắm bắt đầy đủ ngữ cảnh dự án và tự động hóa viết code chính xác.",
      technologies: ["Shell", "Markdown", "System Prompts", "Git"],
      timeline: "Nghiên cứu & Vận hành",
      outcome: "Được tích hợp vào 100% quy trình làm việc của studio, giúp giảm thiểu 45% thời gian thiết lập dự án ban đầu và tối ưu hóa độ chính xác lập trình của Agent.",
      coverImage: "pudocode",
      metrics: "Giảm 45% thời gian cấu hình",
      liveUrl: "https://github.com/DongDuong2001/pudo-code-system",
      sponsorUrl: "https://github.com/sponsors/DongDuong2001"
    },
    {
      id: "fortify_kitchen",
      title: "Fortify Kitchen",
      client: "Fortify Kitchen",
      category: "Ẩm thực Sous-Vide & Hệ thống Đặt món",
      shortStory: "Hệ thống website giới thiệu thực đơn dinh dưỡng nấu chậm Sous-Vide giao tại khu vực TP.HCM. Dự án có sự tham gia lập trình và thiết kế của cả 5 thành viên Duong Phu Dong, Thu Tran, Ho Huy, Huynh Quang Dong và Hao Vu.",
      technologies: ["Next.js", "NestJS", "PostgreSQL", "Render", "Vercel"],
      timeline: "Đang duy trì & Hotfix",
      outcome: "Bàn giao giao diện tối giản giới thiệu thực đơn ăn uống khoa học, tích hợp biểu đồ lượng calo và hiện đang duy trì vận hành ổn định.",
      coverImage: "fortifykitchen",
      metrics: "Giao tại TP.HCM & Đang Bảo trì",
      liveUrl: "https://fortifykitchen.vercel.app/"
    },
    {
      id: "qmd_tech",
      title: "QMD Tech",
      client: "QMD-Tech (Hà Nội)",
      category: "Thương Mại Điện Tử & Hệ Thống Build PC Thông Minh",
      shortStory: "Hệ thống website thương mại điện tử chuyên phân phối Gaming PC và linh kiện máy tính chính hãng tại Hà Nội & giao toàn quốc. Studio xây dựng giao diện hiện đại, tích hợp công cụ Custom PC Builder tự kiểm tra tương thích chân socket và công suất nguồn tự động.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Sepay VietQR", "Vercel"],
      timeline: "Đang Xây Dựng & Vận Hành",
      outcome: "Đang trong lộ trình hoàn thiện và duy trì vận hành ổn định, hỗ trợ thanh toán VietQR tự động, tra cứu bảo hành và tùy biến cấu hình máy tính cá nhân hóa.",
      coverImage: "qmdtech",
      metrics: "Hỏa tốc Hà Nội 2H & Đang Vận Hành",
      liveUrl: "https://qmd-tech.vercel.app/"
    }
  ],
  en: [
    {
      id: "sukajan_store",
      title: "Sukajan Store",
      client: "PhiTruong",
      category: "E Commerce and Brand Launch",
      shortStory: "We designed and built an e commerce website for our client, enabling them to launch their brand online with a secure payment setup and clean user interface. Collaboratively built by Duong Phu Dong, Huynh Quang Dong, and Ho Quang Huy.",
      technologies: ["Next.js", "PostgreSQL", "TailwindCSS", "Vercel"],
      timeline: "3 Weeks",
      outcome: "Successfully delivered the online store with 98% SEO score, full source code handover, and reliable long term warranty support.",
      coverImage: "sukajan",
      metrics: "98% SEO and over 15,000 visits",
      liveUrl: "https://sukajanrandomphitruong.com/"
    },
    {
      id: "pudo_code_system",
      title: "PuDo Code System",
      client: "Founder (Duong Phu Dong)",
      category: "AI Agent Guidelines & Workspace System",
      shortStory: "A standardized instructions framework and workspace context builder designed by Founder Duong Phu Dong, enabling AI coding agents to comprehend project schemas and execute automated tasks reliably.",
      technologies: ["Shell", "Markdown", "System Prompts", "Git"],
      timeline: "R&D & Active Ops",
      outcome: "Deployed in 100% of studio repositories, reducing context indexing speeds by 45% and elevating successful automation runs.",
      coverImage: "pudocode",
      metrics: "45% setup time optimization",
      liveUrl: "https://github.com/DongDuong2001/pudo-code-system",
      sponsorUrl: "https://github.com/sponsors/DongDuong2001"
    },
    {
      id: "fortify_kitchen",
      title: "Fortify Kitchen",
      client: "Fortify Kitchen",
      category: "Sous-Vide Culinary & Ordering System",
      shortStory: "A web platform presenting slow-cooked (Sous-Vide) nutritional meal plans with local delivery in Ho Chi Minh City. Built collaboratively by Duong Phu Dong, Thu Tran, Ho Huy, Huynh Quang Dong, and Hao Vu.",
      technologies: ["Next.js", "NestJS", "PostgreSQL", "Render", "Vercel"],
      timeline: "Active Maintenance & Hotfix",
      outcome: "Launched the interface for healthy menu listings and calorie calculations. Currently in continuous maintenance and hotfix support.",
      coverImage: "fortifykitchen",
      metrics: "Saigon Delivery & Maintenance",
      liveUrl: "https://fortifykitchen.vercel.app/"
    },
    {
      id: "qmd_tech",
      title: "QMD Tech",
      client: "QMD-Tech (Hanoi)",
      category: "E-Commerce & Smart Custom PC Builder Platform",
      shortStory: "An e-commerce platform distributing high-performance Gaming PCs and hardware components in Hanoi with nationwide delivery. Features a real-time Custom PC Builder with automated socket and PSU wattage compatibility checks.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Sepay VietQR", "Vercel"],
      timeline: "Active Build & Maintenance",
      outcome: "Currently under active development and continuous maintenance, featuring instant VietQR payment integration, warranty tracking, and custom hardware builds.",
      coverImage: "qmdtech",
      metrics: "Hanoi 2H Express & Active Maintenance",
      liveUrl: "https://qmd-tech.vercel.app/"
    }
  ]
};

export const PROCESS_DATA: Record<"vi" | "en", ProcessStep[]> = {
  vi: [
    {
      number: "01",
      title: "Khám Phá",
      description: "Chúng tôi cùng bạn trao đổi chi tiết về ý tưởng, xác định các chức năng cần thiết của trang web và lập kế hoạch triển khai cụ thể để phù hợp với nhu cầu thực tế.",
      duration: "Tuần 1",
      deliverables: ["Tài liệu Đặc tả Sản phẩm", "Sơ đồ Kiến trúc Hệ thống", "Lộ trình và Dự toán Chi phí"]
    },
    {
      number: "02",
      title: "Thiết Kế",
      description: "Chúng tôi phác thảo sơ đồ trang web và thiết kế giao diện trên Figma để bạn dễ dàng hình dung. Mọi nút bấm, màu sắc và kiểu chữ đều được thiết kế rõ ràng, nhất quán.",
      duration: "Tuần 2 đến 3",
      deliverables: ["Bản vẽ giao diện mẫu", "Bộ thành phần thiết kế đồng bộ", "Sơ đồ hoạt động của người dùng"]
    },
    {
      number: "03",
      title: "Xây Dựng",
      description: "Chúng tôi tiến hành lập trình giao diện bằng React và máy chủ bằng các công nghệ hiện đại. Cơ sở dữ liệu và hệ thống xử lý được tối ưu hóa để trang web tải nhanh và hoạt động bền bỉ.",
      duration: "Tuần 4 đến 8",
      deliverables: ["Bản dựng thử nghiệm", "Tài liệu hướng dẫn kỹ thuật", "Hệ thống cơ sở dữ liệu hoàn chỉnh"]
    },
    {
      number: "04",
      title: "Triển Khai",
      description: "Chúng tôi kiểm tra bảo mật, tối ưu hóa tốc độ tải trang và chính thức đưa trang web của bạn lên hoạt động trên mạng internet.",
      duration: "Tuần 9",
      deliverables: ["Đưa trang web hoạt động chính thức", "Cấu hình quy trình vận hành tự động", "Báo cáo kiểm tra hiệu năng ổn định"]
    },
    {
      number: "05",
      title: "Đồng Hành",
      description: "Chúng tôi bàn giao đầy đủ mã nguồn và tài liệu hướng dẫn vận hành cho bạn. Đồng thời cam kết bảo hành dài hạn và hỗ trợ kỹ thuật khi cần nâng cấp.",
      duration: "Dài hạn",
      deliverables: ["Mã nguồn và hướng dẫn vận hành", "Hệ thống kiểm tra trạng thái hoạt động", "Hỗ trợ định kỳ hàng tháng"]
    }
  ],
  en: [
    {
      number: "01",
      title: "Discover",
      description: "We discuss details of your idea, identify core website features, and establish a clear execution plan to fit your exact business goals.",
      duration: "Week 1",
      deliverables: ["Product Specification Document", "System Architecture Outline", "Project Timeline and Costing"]
    },
    {
      number: "02",
      title: "Design",
      description: "We map out the user flow and design Figma templates. Every button, color, and typography element is structured clearly and consistently.",
      duration: "Weeks 2 to 3",
      deliverables: ["Interactive Prototypes", "Design Token Library", "User Flow Diagrams"]
    },
    {
      number: "03",
      title: "Build",
      description: "We write clean, typed React code and set up robust backend endpoints. Database and system queries are optimized to guarantee fast load times.",
      duration: "Weeks 4 to 8",
      deliverables: ["Staging Ready Application Build", "API Documentation", "Database Schemas and Tables"]
    },
    {
      number: "04",
      title: "Ship",
      description: "We audit platform security, tune performance scores, and officially deploy your live website to the cloud network.",
      duration: "Week 9",
      deliverables: ["Production Launch", "Automated Release Pipeline", "Performance Stability Report"]
    },
    {
      number: "05",
      title: "Support",
      description: "We hand over full source code and documentation. We also provide long term warranty coverage and support your ongoing feature upgrades.",
      duration: "Long term",
      deliverables: ["Full Developer Handover", "System Health Monitors", "Periodic Tech Checkups"]
    }
  ]
};

export const VALUES_DATA: Record<"vi" | "en", Value[]> = {
  vi: [
    {
      id: "foundation",
      title: "Nền Tảng vững chắc",
      subtitle: "Lập trình thực tế và bền bỉ",
      description: "Chúng tôi tập trung viết mã nguồn sạch và thiết kế cơ sở dữ liệu ngăn nắp. Điều này giúp trang web của bạn chạy mượt mà và dễ dàng nâng cấp các chức năng về sau."
    },
    {
      id: "craft",
      title: "Giao Diện tối giản",
      subtitle: "Thẩm mỹ hiện đại và trực quan",
      description: "Giao diện được thiết kế đơn giản, gọn gàng và dễ nhìn. Chúng tôi chăm chút các khoảng trống, cỡ chữ và hiệu ứng chuyển động nhẹ nhàng để khách mua hàng có trải nghiệm tối ưu."
    },
    {
      id: "partnership",
      title: "Đồng Hành trực tiếp",
      subtitle: "Làm việc trực tiếp không trung gian",
      description: "Bạn sẽ trao đổi và làm việc trực tiếp với đội ngũ lập trình viên thiết kế sản phẩm của mình. Không qua các khâu trung gian, giúp tiến độ công việc nhanh chóng và rõ ràng."
    }
  ],
  en: [
    {
      id: "foundation",
      title: "Foundation First",
      subtitle: "Durable and Practical Code",
      description: "We focus on clean source code and well structured databases. This ensures your website runs smoothly and simplifies future feature updates."
    },
    {
      id: "craft",
      title: "Minimal Design",
      subtitle: "Modern and Clean Aesthetics",
      description: "Our user interfaces are simple, clean, and spacious. We fine tune typography and subtle animations to give your customers the best online shopping experience."
    },
    {
      id: "partnership",
      title: "Direct Partnership",
      subtitle: "Direct Programmer Collaboration",
      description: "You work directly with the developers writing your code. No sales agents or middlemen, resulting in fast execution and crystal clear communication."
    }
  ]
};

export const PRICING_DATA: Record<"vi" | "en", PricingPlan[]> = {
  vi: [
    {
      id: "phase_1_mvp",
      badge: "KHỞI NGHIỆP // 3 PHASE",
      name: "Gói Khởi Nghiệp & Landing Page",
      tagline: "Tối ưu chi phí dành cho cá nhân, landing page chạy Ads, giới thiệu dịch vụ, Spa, Salon, Nhà hàng & Thương hiệu mới.",
      priceVnd: "Liên Hệ Báo Giá",
      priceUsd: "Báo giá theo quy mô & yêu cầu",
      timeline: "1 - 2 Tuần (Trọn gói 3 Phase)",
      phases: [
        { number: "Phase 1", title: "Figma UI/UX Design", duration: "Ngày 1 - 3", description: "Phác thảo Wireframe & thiết kế giao diện độc quyền chuẩn thương hiệu." },
        { number: "Phase 2", title: "Frontend Engineering", duration: "Ngày 4 - 8", description: "Lập trình React/Next.js tối ưu tốc độ < 1s, tương thích mọi thiết bị." },
        { number: "Phase 3", title: "Cloud Launch & Warrant", duration: "Ngày 9 - 14", description: "Cấu hình Tên miền, SEO Google, chạy chính thức & Bảo hành 1 tháng." }
      ],
      benefits: [
        "Trọn gói 3 Phase minh bạch (Figma ➔ Frontend ➔ Cloud Launch)",
        "Phù hợp đa ngành: Spa, Salon, Bất động sản, Nhà hàng, Personal Brand",
        "Lập trình Landing Page / Web Giới thiệu tối ưu tốc độ < 1s",
        "Tối ưu hiển thị Responsive mượt mà trên Mobile & Desktop",
        "Tích hợp nút Zalo, Hotline, Messenger, Email tương tác nhanh",
        "Tối ưu hóa chuẩn SEO Google Baseline & Meta Social Cards",
        "Miễn phí Hỗ trợ cấu hình Tên miền & Hosting Cloud 1 năm",
        "Bảo hành & Hỗ trợ kỹ thuật 24/7 trong 1 tháng sau bàn giao"
      ],
      milestones: [
        { stage: "Đặt Cọc Phase 1", percentage: "30%", description: "Thống nhất đặc tả & Phác thảo bản vẽ Figma UI/UX" },
        { stage: "Nghiệm Thu Phase 2", percentage: "40%", description: "Lập trình giao diện & Tối ưu tốc độ hiển thị" },
        { stage: "Nghiệm Thu Phase 3", percentage: "30%", description: "Cấu hình tên miền, bàn giao mã nguồn & Hướng dẫn" }
      ]
    },
    {
      id: "phase_2_fullstack",
      badge: "KHUYÊN DÙNG ★ // 3 PHASE",
      name: "Gói Doanh Nghiệp Đa Ngành & E-Commerce",
      tagline: "Giải pháp toàn diện cho Doanh nghiệp, Bất động sản, Đặt lịch Booking, Khóa học, Du lịch & Web bán hàng E-Commerce.",
      priceVnd: "Liên Hệ Báo Giá",
      priceUsd: "Báo giá theo quy mô & yêu cầu",
      timeline: "2 - 4 Tuần (Trọn gói 3 Phase)",
      phases: [
        { number: "Phase 1", title: "UX Blueprint & DB Schema", duration: "Tuần 1", description: "Dựng sơ đồ trải nghiệm mua hàng & kiến trúc cơ sở dữ liệu PostgreSQL." },
        { number: "Phase 2", title: "Fullstack & Cart/Payment", duration: "Tuần 2 - 3", description: "Lập trình Web CMS Admin, Giỏ hàng & Tích hợp cổng thanh toán QR." },
        { number: "Phase 3", title: "Security, Launch & SLA", duration: "Tuần 4", description: "Kiểm thử QA bảo mật, bàn giao mã nguồn & Bảo trì hỗ trợ sự cố nhanh." }
      ],
      benefits: [
        "Trọn gói quy trình 3 Phase toàn diện cho các dự án đa ngành",
        "Xây dựng Web Doanh Nghiệp, Đặt Lịch Booking, Đào Tạo & E-Commerce",
        "Trang Admin CMS dễ dàng tự quản lý bài viết, dịch vụ & đơn hàng",
        "Tích hợp mã QR chuyển khoản tự động / Cổng thanh toán tiện lợi",
        "Quản lý cơ sở dữ liệu PostgreSQL / Supabase Cloud bảo mật",
        "Tối ưu hóa SEO Google chuẩn Lighthouse score 95 - 99%",
        "Bao gồm Tên miền quốc tế chính thức & Server CSDL 1 năm",
        "Bảo hành 12 tháng & Hỗ trợ kỹ thuật 24/7 ưu tiên sự cố"
      ],
      milestones: [
        { stage: "Khởi Động Phase 1", percentage: "30%", description: "Thiết kế UI/UX & Cấu trúc CSDL Database Schema" },
        { stage: "Phát Triển Phase 2", percentage: "40%", description: "Hoàn thiện Admin CMS, Giỏ hàng & Thanh toán" },
        { stage: "Nghiệm Thu Phase 3", percentage: "30%", description: "Kiểm thử QA bảo mật, bàn giao 100% mã nguồn" }
      ]
    },
    {
      id: "phase_3_enterprise",
      badge: "CHUYÊN SÂU & AI // 3 PHASE",
      name: "Gói Web App & Hệ Thống AI Độc Quyền",
      tagline: "Quy trình chuyên sâu xây dựng Web App, Mobile App, Hệ thống Quản lý Doanh nghiệp (CRM/ERP) & Tích hợp AI Agent.",
      priceVnd: "Liên Hệ Báo Giá",
      priceUsd: "Báo giá theo quy mô & yêu cầu",
      timeline: "4 - 6+ Tuần (Trọn gói 3 Phase)",
      phases: [
        { number: "Phase 1", title: "App Architecture & Spec", duration: "Tuần 1 - 2", description: "Phân tích đặc tả App, UX Flow & Thiết kế kiến trúc Backend/API." },
        { number: "Phase 2", title: "App Engineering & AI", duration: "Tuần 3 - 4", description: "Lập trình Web/Mobile App, Tích hợp AI Agent & CSDL chịu tải." },
        { number: "Phase 3", title: "Deployment & Priority SLA", duration: "Tuần 5 - 6+", description: "Đóng gói Docker/App Store, kiểm thử chịu tải & Bảo trì ưu tiên 6-12 tháng." }
      ],
      benefits: [
        "Phát triển Web App / Mobile App chuyên sâu theo yêu cầu riêng",
        "Tích hợp tính năng AI Agent thông minh (Chatbot AI, Gợi ý tự động)",
        "Kiến trúc hệ thống nâng cao, tích hợp API & CSDL chịu tải lớn",
        "Cấu hình Docker Cloud, quy trình CI/CD tự động triển khai",
        "Phân quyền đa tài khoản (Multi-role) & Bảo mật nhiều lớp",
        "Tư vấn kiến trúc giải pháp công nghệ & Tối ưu UX người dùng",
        "Bàn giao 100% Mã nguồn app & Bộ tài liệu kiến trúc PuDo Code",
        "Cam kết SLA Bảo trì & Hỗ trợ kỹ thuật ưu tiên 24/7 từ 6 - 12 tháng"
      ],
      milestones: [
        { stage: "Phân Tích Phase 1", percentage: "30%", description: "Chốt tài liệu System Architecture & App Spec Blueprint" },
        { stage: "Lập Trình Phase 2", percentage: "40%", description: "Lập trình Web/Mobile App, API Cloud & AI Agent" },
        { stage: "Nghiệm Thu Phase 3", percentage: "30%", description: "Cấu hình Server, bàn giao 100% Mã nguồn & Đào tạo vận hành" }
      ]
    },
    {
      id: "phase_maintenance",
      badge: "HẬU MÃI & THEO GIỜ // HOURLY SLA",
      name: "Gói Bảo Trì & Nâng Cấp Ngoài Giờ",
      tagline: "Dành riêng cho website/hệ thống đã hết thời hạn bảo hành tiêu chuẩn hoặc doanh nghiệp cần kỹ sư túc trực fix bug, tối ưu tốc độ, nâng cấp tính năng theo giờ mà không mất phí duy trì cố định hàng tháng. Chuyên viên Hoàng Đỗ (Hotline/Zalo: 0392.996.307) trực tiếp tiếp nhận hồ sơ & điều phối xử lý nhanh chóng.",
      priceVnd: "Tính Theo Giờ (Thỏa thuận)",
      priceUsd: "Thỏa thuận theo giờ thực tế",
      timeline: "Linh hoạt / Gói Block 10h - 20h",
      pricingType: "hourly",
      paymentNote: "Tính theo giờ làm việc thực tế / Thỏa thuận giữa khách hàng & Studio",
      buttonText: "LIÊN HỆ HOÀNG ĐỖ (BẢO TRÌ THEO GIỜ)",
      phases: [
        { number: "Bước 1", title: "Khảo Sát & Ước Lượng Giờ", duration: "1 - 2 Giờ", description: "Tiếp nhận yêu cầu hoặc lỗi phát sinh, chốt danh sách task và ước lượng số giờ xử lý dự kiến." },
        { number: "Bước 2", title: "Thực Thi & Time-Tracking", duration: "Linh hoạt", description: "Kỹ sư tiến hành fix bug hoặc code tính năng, sử dụng công cụ time-tracking ghi nhận thời gian minh bạch." },
        { number: "Bước 3", title: "Nghiệm Thu & Bàn Giao", duration: "Hoàn tất task", description: "Khách hàng kiểm thử nghiệm thu trực tiếp trên môi trường thực tế và thanh toán đúng số giờ làm việc." }
      ],
      features: [
        {
          title: "Hạng Mục Bảo Trì & Xử Lý Sự Cố Khẩn Cấp",
          items: [
            "Fix bug phát sinh, vá lỗi giao diện vỡ layout & xung đột thư viện",
            "Vá lỗ hổng bảo mật, gia hạn chứng chỉ SSL & cấu hình Cloudflare",
            "Tối ưu truy vấn CSDL, dọn dẹp cache & cải thiện điểm Google Lighthouse",
            "Xử lý sự cố máy chủ gián đoạn, khôi phục dữ liệu từ bản backup an toàn"
          ]
        },
        {
          title: "Nâng Cấp Tính Năng & Cam Kết Hỗ Trợ Minh Bạch",
          items: [
            "Chuyên viên Hoàng Đỗ trực tiếp tiếp nhận (Hotline: 0392.996.307 / Zalo) & điều phối xử lý ngay",
            "Code thêm tính năng mới, tạo form khảo sát, chỉnh banner theo yêu cầu",
            "Nâng cấp phiên bản framework (React, Next.js, Node.js) an toàn",
            "Phần mềm Time-tracking bấm giờ minh bạch, báo cáo chi tiết từng task",
            "Cam kết phản hồi sự cố trong vòng 2 - 4h, không ràng buộc phí duy trì hàng tháng"
          ]
        }
      ],
      benefits: [
        "Đầu mối tiếp nhận duy nhất: Hoàng Đỗ (0392.996.307) đảm bảo tiến độ & phản hồi nhanh",
        "Không ràng buộc phí duy trì hàng tháng cố định nếu không có nhu cầu",
        "Chi phí tính theo giờ làm việc thực tế (Time-tracking minh bạch)",
        "Ưu tiên tiếp nhận xử lý sự cố khẩn cấp trong vòng 2 - 4h",
        "Bảo đảm an toàn dữ liệu, luôn tạo bản sao lưu trước khi can thiệp mã nguồn",
        "Đội ngũ kỹ sư chính của Three Bugs Studio trực tiếp xử lý, không qua trung gian",
        "Báo cáo chi tiết nhật ký công việc (Worklog report) kèm mã commit rõ ràng"
      ],
      milestones: [
        { stage: "Tiếp Nhận Task", percentage: "Ước lượng", description: "Khảo sát sự cố / yêu cầu và gửi bản ước lượng giờ làm việc" },
        { stage: "Xử Lý & Time-Tracking", percentage: "Thực thi", description: "Tiến hành sửa lỗi hoặc phát triển tính năng theo giờ bấm máy" },
        { stage: "Nghiệm Thu & Báo Cáo", percentage: "Nghiệm thu", description: "Khách hàng kiểm tra kết quả, nhận báo cáo và thanh toán theo giờ" }
      ]
    }
  ],
  en: [
    {
      id: "phase_1_mvp",
      badge: "STARTER // 3 PHASES",
      name: "Starter Web & Landing Page",
      tagline: "Cost-effective 3-Phase execution tailored for landing pages, ad campaigns, Spa, Salon, Restaurants & new brands.",
      priceVnd: "Quote on Request",
      priceUsd: "Tailored to Project Scope",
      timeline: "1 - 2 Weeks (Full 3 Phases)",
      phases: [
        { number: "Phase 1", title: "Figma UI/UX Design", duration: "Days 1 - 3", description: "Wireframe layout sketches & custom brand-aligned Figma UI UX design." },
        { number: "Phase 2", title: "Frontend Engineering", duration: "Days 4 - 8", description: "Fast React/Next.js code build (< 1s load time) across all responsive screens." },
        { number: "Phase 3", title: "Cloud Launch & Warranty", duration: "Days 9 - 14", description: "Custom domain, Google SEO, live deployment & 1-month tech warranty." }
      ],
      benefits: [
        "Transparent 3-Phase execution (Figma ➔ Frontend ➔ Cloud Launch)",
        "Suitable for multi-sector: Spa, Salon, Real Estate, F&B, Personal Brand",
        "Fast-loading Landing Page / Corporate Web (< 1s load time)",
        "Fully Responsive layout across Mobile, Tablet & Desktop",
        "Direct integration of Contact buttons (Zalo, Hotline, Email)",
        "Google SEO Baseline & Meta Social Cards optimization",
        "Free assistance with Domain setup & Cloud Hosting 1 year",
        "24/7 Technical warranty & support for 1 month after handover"
      ],
      milestones: [
        { stage: "Phase 1 Deposit", percentage: "30%", description: "Locking spec requirements & Figma UI/UX prototypes" },
        { stage: "Phase 2 Staging", percentage: "40%", description: "Frontend code build & speed optimization" },
        { stage: "Phase 3 Launch", percentage: "30%", description: "Domain setup, source code handover & user guide" }
      ]
    },
    {
      id: "phase_2_fullstack",
      badge: "MOST POPULAR ★ // 3 PHASES",
      name: "Corporate & Multi-Sector Web",
      tagline: "Comprehensive 3-Phase solution for Corporate, Real Estate, Booking, Courses, Tourism & E-Commerce stores.",
      priceVnd: "Quote on Request",
      priceUsd: "Tailored to Project Scope",
      timeline: "2 - 4 Weeks (Full 3 Phases)",
      phases: [
        { number: "Phase 1", title: "UX Blueprint & DB Schema", duration: "Week 1", description: "Mapping shopping user journey & PostgreSQL database schema architecture." },
        { number: "Phase 2", title: "Fullstack & Cart/Payment", duration: "Weeks 2 - 3", description: "Admin CMS dashboard, Shopping cart & Instant QR payment gateway." },
        { number: "Phase 3", title: "Security, Launch & SLA", duration: "Week 4", description: "Security QA audit, code repository handover & 12-month priority support." }
      ],
      benefits: [
        "Full 3-Phase development pipeline for multi-sector projects",
        "Corporate Web, Booking Portals, Training & E-Commerce platforms",
        "Easy-to-use Admin CMS for managing products, articles & orders",
        "Instant QR payment gateway & online payment integration",
        "Secure PostgreSQL / Supabase Cloud database architecture",
        "Google Lighthouse performance score optimized to 95 - 99%",
        "Includes Official Custom Domain & Database Server 1 year",
        "12 Months warranty & 24/7 priority technical support commitment"
      ],
      milestones: [
        { stage: "Phase 1 Initiation", percentage: "30%", description: "UI/UX approval & Database Schema architecture" },
        { stage: "Phase 2 Build", percentage: "40%", description: "Admin CMS, Cart system & Payment flow integration" },
        { stage: "Phase 3 Launch", percentage: "30%", description: "Security testing & 100% repository handover" }
      ]
    },
    {
      id: "phase_3_enterprise",
      badge: "ENTERPRISE & AI // 3 PHASES",
      name: "Custom Web App & AI Platform",
      tagline: "Deep 3-Phase execution building Web Apps, Mobile Apps, Enterprise Systems (CRM/ERP) & AI Agents.",
      priceVnd: "Quote on Request",
      priceUsd: "Tailored to Project Scope",
      timeline: "4 - 6+ Weeks (Full 3 Phases)",
      phases: [
        { number: "Phase 1", title: "App Architecture & Spec", duration: "Weeks 1 - 2", description: "Locking PuDo Code specs & designing mobile/web app API architecture." },
        { number: "Phase 2", title: "App Engineering & AI", duration: "Weeks 3 - 4", description: "Building Web/Mobile App, Gemini AI Agent & Cloud DB workflows." },
        { number: "Phase 3", title: "Deployment & Priority SLA", duration: "Weeks 5 - 6+", description: "Docker/App Store setup, load testing & 6-12 month priority SLA." }
      ],
      benefits: [
        "Custom Web App / Mobile App development built to exact specifications",
        "Smart AI Agent integration (AI Chatbot, automated data recommendations)",
        "Advanced architecture with high-concurrency API & Database design",
        "Docker Cloud setup with automated CI/CD deployment pipelines",
        "Multi-role Access Control & multi-layered enterprise security",
        "Tech stack architecture consulting & UX optimization",
        "Complete 100% source code handover & PuDo Code system docs",
        "Priority SLA maintenance & technical support for 6 - 12 months"
      ],
      milestones: [
        { stage: "Phase 1 Blueprint", percentage: "30%", description: "Finalizing System Architecture & App Spec Document" },
        { stage: "Phase 2 Build", percentage: "40%", description: "Mobile/Web App frontend, Backend API & AI Agent coding" },
        { stage: "Phase 3 Launch", percentage: "30%", description: "Cloud production setup, 100% code handover & priority support" }
      ]
    },
    {
      id: "phase_maintenance",
      badge: "POST-WARRANTY // HOURLY SLA",
      name: "Post-Warranty Hourly SLA & Maintenance",
      tagline: "Dedicated to systems whose warranty has ended or businesses needing on-demand engineers for hotfixes, performance tuning, and new features billed hourly with no recurring lock-in. Direct intake by Lead Consultant Hoang Do (Hotline/Zalo: 0392.996.307) for immediate scheduling.",
      priceVnd: "Hourly Rate (Mutual Agreement)",
      priceUsd: "Hourly Rate (Mutual Agreement)",
      timeline: "On-Demand / Flexible 10h - 20h Blocks",
      pricingType: "hourly",
      paymentNote: "Billed strictly on tracked working hours / Mutual client agreement",
      buttonText: "CONTACT HOANG DO (HOURLY SLA)",
      phases: [
        { number: "Step 1", title: "Assessment & Hour Estimation", duration: "1 - 2 Hours", description: "Reviewing issue logs or new requests, itemizing tasks with upfront hour estimates." },
        { number: "Step 2", title: "Execution & Time-Tracking", duration: "Flexible", description: "Engineers apply hotfixes or code new features with transparent time-tracking logs." },
        { number: "Step 3", title: "QA Sign-off & Delivery", duration: "Upon Completion", description: "Direct staging verification by client, paying strictly for verified hours worked." }
      ],
      features: [
        {
          title: "Emergency Maintenance & Security Hotfixes",
          items: [
            "Debugging critical bugs, layout glitches & package version conflicts",
            "Security vulnerability patching, SSL certificate renewal & Cloudflare tuning",
            "Database query optimization, cache clearing & Lighthouse score boosts",
            "Server downtime troubleshooting & secure database backup restoration"
          ]
        },
        {
          title: "Feature Additions & Transparent SLA Commitment",
          items: [
            "Lead Consultant Hoang Do directly intakes requests (Hotline: 0392.996.307 / Zalo) with rapid engineer dispatch",
            "Coding new components, custom landing pages, banners & forms",
            "Safe dependencies & framework version upgrades (React, Next.js, Node.js)",
            "Transparent time-tracking software with task-by-task hour breakdowns",
            "Rapid 2-4h incident response SLA with zero monthly subscription lock-in"
          ]
        }
      ],
      benefits: [
        "Dedicated intake lead: Hoang Do (0392.996.307) ensuring rapid communication & accountability",
        "Zero monthly lock-in or recurring fees when you do not need support",
        "Billed strictly on actual tracked engineering hours (Full transparency)",
        "High-priority incident response within 2 - 4 hours of notification",
        "Full data safety guarantee: mandatory pre-maintenance snapshots and backups",
        "Direct handling by core Three Bugs Studio engineers without middlemen",
        "Detailed worklog report delivered with transparent git commit history"
      ],
      milestones: [
        { stage: "Task Assessment", percentage: "Estimate", description: "Analyzing requirements/incidents and sending transparent hour quote" },
        { stage: "Work & Time-Track", percentage: "Execute", description: "Coding fixes or features with verified clock-in time tracking" },
        { stage: "Sign-off & Report", percentage: "Sign-off", description: "Client inspects delivery, reviews hour report and settles payment" }
      ]
    }
  ]
};

export const TEAM_DATA: Record<"vi" | "en", TeamMember[]> = {
  vi: [
    {
      name: "Duong Phu Dong",
      role: "Founder & Trưởng nhóm Dự án Doanh nghiệp",
      bio: "Sáng lập Three Bugs Studio với kinh nghiệm dày dặn trong quản trị và trực tiếp hoàn thành các dự án phần mềm cho doanh nghiệp (nổi bật là dự án Project Luvcraft cho Project Pluto trên RMIT Showcase). Anh chịu trách nhiệm quản lý tổng thể, đặc tả kiến trúc kỹ thuật và cam kết chất lượng bàn giao.",
      specialties: ["Quản lý Dự án Doanh nghiệp", "Đặc tả Phần mềm", "Kiến trúc Hệ thống", "RMIT Enterprise Showcase"],
      socials: {
        github: "https://github.com/DongDuong2001"
      },
      colorTag: {
        name: "Cyber Orange",
        hex: "#FF6A00",
        badgeClass: "bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/40",
        glowClass: "border-[#FF6A00]/40 shadow-[0_0_20px_rgba(255,106,0,0.25)]",
        borderHex: "#FF6A00"
      },
      diagramRole: "PROJECT SPEC & EXECUTION LEAD",
      nodeId: "node_dong",
      connectsTo: ["node_thutran", "node_hoangdong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Thu Tran",
      role: "Co-Founder, Thiết kế UI/UX & Quản lý Sổ sách Studio",
      bio: "Đồng sáng lập studio, chuyên gia thiết kế giao diện hiện đại kiêm phụ trách quản trị vận hành và quản lý sổ sách tài chính nội bộ cho Three Bugs Studio. Cô đảm bảo tính minh bạch về thu chi dự án, tối ưu hóa dòng tiền và kiến tạo trải nghiệm người dùng tinh tế.",
      specialties: ["Thiết kế UI/UX", "Quản lý Sổ sách Tài chính", "Vận hành Studio", "Hệ thống Thiết kế"],
      socials: {
        github: "https://github.com/mthutt"
      },
      colorTag: {
        name: "Neon Violet",
        hex: "#A855F7",
        badgeClass: "bg-[#A855F7]/15 text-[#C084FC] border-[#A855F7]/40",
        glowClass: "border-[#A855F7]/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
        borderHex: "#A855F7"
      },
      diagramRole: "UI/UX & STUDIO FINANCIAL OPERATIONS",
      nodeId: "node_thutran",
      connectsTo: ["node_hohuy", "node_haovu"],
      highlightBadge: "SỔ SÁCH & TÀI CHÍNH"
    },
    {
      name: "Huynh Quang Dong",
      role: "Scrum Master & Kiểm thử QA Doanh nghiệp",
      bio: "Chuyên gia điều phối Agile Scrum và kiểm thử chất lượng phần mềm với bề dày kinh nghiệm thực thi dự án doanh nghiệp thực tế (Project Luvcraft trên RMIT Showcase). Anh đảm bảo mọi tính năng được kiểm định chặt chẽ, luồng người dùng không lỗi và quy trình bàn giao đạt chuẩn.",
      specialties: ["Kiểm thử Phần mềm QA", "Scrum Master Agile", "Kiểm thử Chịu tải", "Đảm bảo Chất lượng"],
      socials: {
        github: "https://github.com/quangdong26"
      },
      colorTag: {
        name: "Electric Cyan",
        hex: "#06B6D4",
        badgeClass: "bg-[#06B6D4]/15 text-[#38BDF8] border-[#06B6D4]/40",
        glowClass: "border-[#06B6D4]/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
        borderHex: "#06B6D4"
      },
      diagramRole: "SCRUM MASTER & QA TESTING",
      nodeId: "node_hoangdong",
      connectsTo: ["node_dong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Ho Quang Huy",
      role: "Kỹ sư DevOps & Full Stack Doanh nghiệp",
      bio: "Kỹ sư đám mây và lập trình viên Full Stack với kinh nghiệm thực chiến phát triển giải pháp doanh nghiệp trên RMIT Showcase (Project Luvcraft). Anh phụ trách kiến trúc vi dịch vụ (FastAPI, RabbitMQ, Celery), Docker container hóa, cơ sở dữ liệu PostgreSQL và hạ tầng CI/CD chịu tải cao.",
      specialties: ["Kiến trúc DevOps & Docker", "Lập trình Full Stack", "Hệ thống Microservice", "Cơ sở dữ liệu PostgreSQL"],
      socials: {
        github: "https://github.com/HoHuy2402"
      },
      colorTag: {
        name: "Emerald Mint",
        hex: "#10B981",
        badgeClass: "bg-[#10B981]/15 text-[#34D399] border-[#10B981]/40",
        glowClass: "border-[#10B981]/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
        borderHex: "#10B981"
      },
      diagramRole: "DEVOPS & FULLSTACK PIPELINE",
      nodeId: "node_hohuy",
      connectsTo: ["node_hoangdong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Hao Vu",
      role: "Kỹ sư Backend & Cơ sở dữ liệu Doanh nghiệp",
      bio: "Kỹ sư chuyên sâu về hệ thống máy chủ, API bảo mật và tối ưu dữ liệu quy mô doanh nghiệp trên RMIT Showcase (Project Luvcraft). Anh phụ trách thiết kế lược đồ cơ sở dữ liệu tối ưu, phân quyền đa tài khoản RBAC và tích hợp các pipeline dữ liệu thông minh.",
      specialties: ["Lập trình Backend", "Tối ưu hóa CSDL", "Bảo mật & Phân quyền RBAC", "Thiết kế API Doanh nghiệp"],
      socials: {
        github: "https://github.com/haovu310"
      },
      colorTag: {
        name: "Rose Crimson",
        hex: "#F43F5E",
        badgeClass: "bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/40",
        glowClass: "border-[#F43F5E]/40 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
        borderHex: "#F43F5E"
      },
      diagramRole: "BACKEND API & DATABASE ARCHITECT",
      nodeId: "node_haovu",
      connectsTo: ["node_hohuy"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    }
  ],
  en: [
    {
      name: "Duong Phu Dong",
      role: "Studio Founder & Enterprise Project Lead",
      bio: "Founder of Three Bugs Studio with proven enterprise project execution experience (notably Project Luvcraft for Project Pluto featured on RMIT Showcase). He oversees end-to-end architecture, technical specifications, and timely delivery.",
      specialties: ["Enterprise Project Management", "Software Specifications", "System Architecture", "RMIT Enterprise Showcase"],
      socials: {
        github: "https://github.com/DongDuong2001"
      },
      colorTag: {
        name: "Cyber Orange",
        hex: "#FF6A00",
        badgeClass: "bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/40",
        glowClass: "border-[#FF6A00]/40 shadow-[0_0_20px_rgba(255,106,0,0.25)]",
        borderHex: "#FF6A00"
      },
      diagramRole: "PROJECT SPEC & EXECUTION LEAD",
      nodeId: "node_dong",
      connectsTo: ["node_thutran", "node_hoangdong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Thu Tran",
      role: "Co-Founder, UI/UX Designer & Studio Financial Operations",
      bio: "Co-founder of the studio, interface designer and internal financial bookkeeper for Three Bugs Studio. She oversees project financial records, operational bookkeeping, and crafts clean, high-conversion UI/UX design systems.",
      specialties: ["UI/UX Design", "Financial Bookkeeping", "Studio Operations", "Design Systems"],
      socials: {
        github: "https://github.com/mthutt"
      },
      colorTag: {
        name: "Neon Violet",
        hex: "#A855F7",
        badgeClass: "bg-[#A855F7]/15 text-[#C084FC] border-[#A855F7]/40",
        glowClass: "border-[#A855F7]/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
        borderHex: "#A855F7"
      },
      diagramRole: "UI/UX & STUDIO FINANCIAL OPERATIONS",
      nodeId: "node_thutran",
      connectsTo: ["node_hohuy", "node_haovu"],
      highlightBadge: "FINANCIAL OPS"
    },
    {
      name: "Huynh Quang Dong",
      role: "Scrum Master & Enterprise QA Lead",
      bio: "Agile Scrum coordinator and quality assurance lead with verified enterprise project experience (Project Luvcraft on RMIT Showcase). He enforces rigorous QA testing, test automation, and flawless milestone delivery.",
      specialties: ["Enterprise QA Testing", "Agile Scrum Master", "Stress Testing", "Quality Delivery"],
      socials: {
        github: "https://github.com/quangdong26"
      },
      colorTag: {
        name: "Electric Cyan",
        hex: "#06B6D4",
        badgeClass: "bg-[#06B6D4]/15 text-[#38BDF8] border-[#06B6D4]/40",
        glowClass: "border-[#06B6D4]/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
        borderHex: "#06B6D4"
      },
      diagramRole: "SCRUM MASTER & QA TESTING",
      nodeId: "node_hoangdong",
      connectsTo: ["node_dong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Ho Quang Huy",
      role: "DevOps & Enterprise Full Stack Engineer",
      bio: "Cloud infrastructure and full-stack engineer with proven enterprise development experience featured on RMIT Showcase (Project Luvcraft). He architects asynchronous pipelines (FastAPI, RabbitMQ, Celery), Docker containers, PostgreSQL, and robust CI/CD environments.",
      specialties: ["DevOps & Docker Setup", "Full Stack Development", "Microservice Systems", "PostgreSQL Database"],
      socials: {
        github: "https://github.com/HoHuy2402"
      },
      colorTag: {
        name: "Emerald Mint",
        hex: "#10B981",
        badgeClass: "bg-[#10B981]/15 text-[#34D399] border-[#10B981]/40",
        glowClass: "border-[#10B981]/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
        borderHex: "#10B981"
      },
      diagramRole: "DEVOPS & FULLSTACK PIPELINE",
      nodeId: "node_hohuy",
      connectsTo: ["node_hoangdong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Hao Vu",
      role: "Enterprise Backend & Database Engineer",
      bio: "Server-side and database architect with proven enterprise project delivery on RMIT Showcase (Project Luvcraft). He builds secure backend APIs, optimized PostgreSQL schemas, Role-Based Access Control (RBAC), and high-throughput data pipelines.",
      specialties: ["Backend Engineering", "Database Optimization", "Enterprise RBAC Security", "API Architecture"],
      socials: {
        github: "https://github.com/haovu310"
      },
      colorTag: {
        name: "Rose Crimson",
        hex: "#F43F5E",
        badgeClass: "bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/40",
        glowClass: "border-[#F43F5E]/40 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
        borderHex: "#F43F5E"
      },
      diagramRole: "BACKEND API & DATABASE ARCHITECT",
      nodeId: "node_haovu",
      connectsTo: ["node_hohuy"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    }
  ]
};

export const TECH_DATA: Record<"vi" | "en", TechItem[]> = {
  vi: [
    { name: "Next.js", category: "frontend", description: "Khung phát triển hỗ trợ SSR và kết xuất tĩnh.", level: "Chuyên sâu" },
    { name: "React.js", category: "frontend", description: "Giao diện người dùng hướng trạng thái và mo đun hóa.", level: "Cốt lõi" },
    { name: "TypeScript", category: "frontend", description: "Đảm bảo an toàn kiểu dữ liệu ở mức biên dịch.", level: "Cốt lõi" },
    { name: "NestJS", category: "backend", description: "Khung phát triển Backend Node.js doanh nghiệp mở rộng cao.", level: "Chuyên sâu" },
    { name: "Java", category: "backend", description: "Nền tảng backend doanh nghiệp bảo mật và hiệu năng ổn định.", level: "Chuyên sâu" },
    { name: "Prisma", category: "database", description: "Hệ thống ORM hiện đại, an toàn kiểu dữ liệu cho SQL.", level: "Cốt lõi" },
    { name: "Supabase", category: "database", description: "Nền tảng dịch vụ backend tích hợp sẵn cơ sở dữ liệu Postgres.", level: "Chuyên sâu" },
    { name: "Neon Database", category: "database", description: "Cơ sở dữ liệu PostgreSQL phi máy chủ hỗ trợ mở rộng nhanh.", level: "Chuyên sâu" },
    { name: "PostgreSQL", category: "database", description: "Hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, tin cậy cao.", level: "Cốt lõi" },
    { name: "Render", category: "devops", description: "Hạ tầng Cloud Hosting vận hành ứng dụng Web & Backend API.", level: "Chuyên sâu" },
    { name: "Coolify", category: "devops", description: "Nền tảng PaaS tự quản lý (Self-hosted) triển khai ứng dụng trên hạ tầng đám mây riêng.", level: "Chuyên sâu" },
    { name: "Netlify", category: "devops", description: "Hạ tầng Cloud Hosting tối ưu triển khai ứng dụng Frontend & Jamstack tốc độ cao.", level: "Cốt lõi" },
    { name: "Railway", category: "devops", description: "Nền tảng Cloud PaaS hiện đại giúp đóng gói & triển khai Web, Database tự động.", level: "Chuyên sâu" },
    { name: "Docker", category: "devops", description: "Môi trường đóng gói phần mềm nhất quán khi triển khai.", level: "Cốt lõi" },
    { name: "GitHub Actions", category: "devops", description: "Hệ thống tự động hóa quy trình kiểm thử và tích hợp CI/CD.", level: "Chuyên sâu" }
  ],
  en: [
    { name: "Next.js", category: "frontend", description: "Production framework for SSR and static rendering.", level: "Primary" },
    { name: "React.js", category: "frontend", description: "State driven declarative UI components.", level: "Core" },
    { name: "TypeScript", category: "frontend", description: "Static compile time type safety and contracts.", level: "Core" },
    { name: "NestJS", category: "backend", description: "Scalable enterprise Node.js server framework.", level: "Primary" },
    { name: "Java", category: "backend", description: "Robust, secure, high performance enterprise backend.", level: "Primary" },
    { name: "Prisma", category: "database", description: "Modern, type safe ORM for relational queries.", level: "Core" },
    { name: "Supabase", category: "database", description: "Backend service integrated with Postgres.", level: "Primary" },
    { name: "Neon Database", category: "database", description: "Serverless Postgres database with instant scaling.", level: "Primary" },
    { name: "PostgreSQL", category: "database", description: "Powerful relational database with high data integrity.", level: "Core" },
    { name: "Render", category: "devops", description: "Cloud platform hosting web applications & API services.", level: "Primary" },
    { name: "Coolify", category: "devops", description: "Self-hosted PaaS alternative for deploying applications on private cloud servers.", level: "Primary" },
    { name: "Netlify", category: "devops", description: "High-performance cloud platform for Jamstack & Frontend web apps.", level: "Core" },
    { name: "Railway", category: "devops", description: "Modern cloud PaaS platform for instant deployment of web apps & databases.", level: "Primary" },
    { name: "Docker", category: "devops", description: "Containerized, predictable deployment parity.", level: "Core" },
    { name: "GitHub Actions", category: "devops", description: "Automated testing and CI/CD deployment workflows.", level: "Primary" }
  ]
};

export const TESTIMONIALS_DATA: Record<"vi" | "en", Testimonial[]> = {
  vi: [
    {
      quote: "Làm việc rất chuyên nghiệp. Lộ trình rõ ràng, bàn giao đúng hạn kèm chính sách hỗ trợ lâu dài khiến chúng tôi rất yên tâm.",
      author: "Hoàng Anh",
      role: "Đồng sáng lập",
      company: "Sukajan Store"
    },
    {
      quote: "Đội ngũ làm việc hiệu quả. Họ đã bàn giao trang web Sukajan hoạt động ổn định với chất lượng tốt và cam kết bảo hành lâu dài.",
      author: "Phi Trường",
      role: "Đồng sáng lập",
      company: "Sukajan Store"
    }
  ],
  en: [
    {
      quote: "Highly professional. Clear roadmap, on-time delivery, and long-term support make us extremely confident.",
      author: "Hoang Anh",
      role: "Co-Founder",
      company: "Sukajan Store"
    },
    {
      quote: "Outstanding team. They delivered our Sukajan store with top-tier quality and premium support.",
      author: "Phi Truong",
      role: "Co-Founder",
      company: "Sukajan Store"
    }
  ]
};

export const FAQ_DATA: Record<"vi" | "en", FAQItem[]> = {
  vi: [
    {
      question: "Khách hàng có được bàn giao 100% toàn bộ mã nguồn và dữ liệu khi nghiệm thu không?",
      badge: "CAM KẾT 100% SỞ HỮU",
      category: "ownership",
      answer: "Có, 100% quyền sở hữu thuộc về bạn! Ngay khi hoàn tất dự án, Three Bugs Studio bàn giao toàn bộ mã nguồn sạch (Clean Code repository trên GitHub/GitLab), cấu trúc cơ sở dữ liệu PostgreSQL/Supabase, cấu hình Cloud Hosting (Vercel/Docker) và toàn bộ tài sản thiết kế Figma gốc. Chúng tôi cam kết không cài cắm mã khóa độc quyền, không ép khách hàng trả phí duy trì bản quyền hàng tháng/năm. Bạn có toàn quyền sao lưu, tự vận hành hoặc chuyển giao cho đội ngũ kỹ sư nội bộ phát triển tiếp bất kỳ lúc nào mà không bị ràng buộc (Zero Vendor Lock-in).",
      keyBenefits: [
        "Bàn giao full source code kho lưu trữ GitHub/GitLab độc lập",
        "Không thu phí bản quyền mã nguồn định kỳ hàng tháng hay hàng năm",
        "Chủ động 100% dữ liệu kinh doanh, không bị phụ thuộc vào đơn vị phát triển",
        "Bàn giao toàn bộ file thiết kế gốc Figma và tài liệu kiến trúc hệ thống"
      ]
    },
    {
      question: "Chi phí dự án được tính như thế nào? Studio có cam kết không phát sinh phụ phí ẩn không?",
      badge: "CAM KẾT 0Đ PHÍ ẨN",
      category: "pricing",
      answer: "Three Bugs Studio cam kết 100% không phát sinh bất kỳ phụ phí ẩn nào ngoài hợp đồng! Báo giá được tính toán trọn gói dựa trên bảng đặc tả tính năng chi tiết (Scope of Work) được hai bên thống nhất từ đầu. Chi phí thanh toán được chia nhỏ theo 3 Phase nghiệm thu rõ ràng: bạn chỉ giải ngân giai đoạn tiếp theo khi đã kiểm tra và hoàn toàn hài lòng với kết quả giai đoạn trước. Nếu trong quá trình làm bạn muốn bổ sung tính năng mới ngoài thỏa thuận ban đầu, Studio sẽ báo giá độc lập minh bạch và chỉ triển khai khi có sự đồng ý của bạn.",
      keyBenefits: [
        "Báo giá trọn gói minh bạch, cam kết không phát sinh phụ phí bất ngờ",
        "Thanh toán linh hoạt chia theo từng cột mốc (Phase) nghiệm thu thực tế",
        "Chỉ thanh toán giai đoạn tiếp theo khi đã nghiệm thu ưng ý giai đoạn trước",
        "Tư vấn tối ưu chi phí hạ tầng Cloud (Vercel/Supabase) mức tiết kiệm nhất"
      ]
    },
    {
      question: "Chính sách bảo hành, sửa lỗi và duy trì hoạt động sau khi bàn giao diễn ra như thế nào?",
      badge: "BẢO HÀNH ĐẾN 12 THÁNG",
      category: "warranty",
      answer: "Mọi sản phẩm của Three Bugs Studio đều đi kèm chính sách bảo hành kỹ thuật MIỄN PHÍ 100% từ 3 đến 12 tháng (tùy theo gói dịch vụ). Trong suốt thời gian bảo hành, bất kỳ lỗi lập trình hoặc vấn đề phát sinh từ hệ thống đã bàn giao đều được đội ngũ kỹ sư khắc phục triệt để không tốn thêm chi phí. Chúng tôi cam kết SLA phản hồi nhanh chóng trong vòng 1–2 giờ đối với các sự cố vận hành khẩn cấp, đồng thời hỗ trợ thiết lập cơ chế tự động sao lưu dữ liệu (Automated Daily Backup) để bạn hoàn toàn an tâm kinh doanh.",
      keyBenefits: [
        "Bảo hành kỹ thuật miễn phí 100% từ 3 đến 12 tháng sau bàn giao",
        "Sửa chữa triệt để mọi lỗi phát sinh từ hệ thống với SLA phản hồi khẩn cấp 1-2h",
        "Hỗ trợ cấu hình tự động sao lưu dữ liệu và giám sát Uptime 99.9%",
        "Chính sách hỗ trợ kỹ thuật đồng hành trọn đời sau thời gian bảo hành"
      ]
    },
    {
      question: "Tôi sẽ làm việc với ai? Có phải trao đổi qua các nhân viên kinh doanh (Sales) trung gian không?",
      badge: "LÀM VIỆC TRỰC TIẾP 1:1",
      category: "ownership",
      answer: "Bạn sẽ làm việc trực tiếp 1:1 với các kỹ sư phần mềm và nhà thiết kế UI/UX chủ chốt của Three Bugs Studio! Chúng tôi áp dụng mô hình Hợp Tác Kỹ Sư Trực Tiếp (Direct Engineer Partnership), loại bỏ hoàn toàn các khâu telesale hay môi giới trung gian — nơi thường gây ra tình trạng hiểu sai yêu cầu kỹ thuật ('tam sao thất bản') và đẩy chi phí dự án lên cao. Bạn sẽ được tư vấn các giải pháp kỹ thuật đúng trọng tâm bài toán kinh doanh, tiết kiệm thời gian phản hồi và rút ngắn hơn 50% tiến độ trao đổi.",
      keyBenefits: [
        "Trao đổi trực tiếp cùng đội ngũ 5 kỹ sư lập trình & thiết kế chính của Studio",
        "Không qua sales hay môi giới trung gian, loại bỏ hoàn toàn tình trạng hiểu sai yêu cầu",
        "Tư vấn kỹ thuật thực tế, đúng nhu cầu kinh doanh, tiết kiệm tối đa ngân sách",
        "Nhóm chat hỗ trợ riêng biệt phản hồi nhanh chóng qua Zalo / Telegram / Discord"
      ]
    },
    {
      question: "Studio cam kết tiến độ bàn giao ra sao? Tôi có được theo dõi tiến độ thời gian thực không?",
      badge: "CAM KẾT ĐÚNG TIẾN ĐỘ",
      category: "warranty",
      answer: "Chúng tôi cam kết tiến độ rõ ràng bằng văn bản: thời gian hoàn thành thông thường từ 1–3 tuần đối với Website/E-Commerce và 4–6 tuần đối với các hệ thống Web App/AI phức tạp. Trong suốt quá trình phát triển, bạn sẽ được cung cấp đường link Live Staging/Demo riêng biệt để trực tiếp truy cập trên điện thoại và máy tính, theo dõi từng màn hình được hoàn thiện mỗi tuần. Hợp đồng có điều khoản cam kết mốc thời gian rõ ràng: nếu trễ hạn do lỗi từ Studio, chúng tôi cam kết chịu phạt hợp đồng hoặc bồi hoàn bằng các tháng bảo trì kỹ thuật miễn phí.",
      keyBenefits: [
        "Tiến độ hoàn thành nhanh chóng: 1–3 tuần cho Web/E-commerce, 4–6 tuần cho Web App",
        "Cung cấp link Staging/Demo kiểm thử trực tiếp trên điện thoại & máy tính hàng tuần",
        "Cam kết điều khoản tiến độ rõ ràng trong hợp đồng pháp lý",
        "Chính sách bồi thường hoặc gia hạn bảo trì miễn phí nếu trễ hạn do lỗi Studio"
      ]
    },
    {
      question: "Website bàn giao có đảm bảo chuẩn SEO Google và đạt điểm tốc độ cao trên di động không?",
      badge: "CHUẨN SEO & PAGESPEED 95+",
      category: "quality",
      answer: "Chắc chắn có! Mọi sản phẩm xuất xưởng từ Three Bugs Studio đều được kiểm thử và tối ưu đạt điểm Google PageSpeed Insights Xanh (85 – 95+) trên cả máy tính lẫn thiết bị di động. Chúng tôi tích hợp sẵn hạ tầng SEO On-Page chuẩn chỉnh: thẻ Open Graph chia sẻ mạng xã hội, dữ liệu có cấu trúc Schema JSON-LD, Sitemap.xml tự động, và cấu trúc Semantic HTML5 tải trang dưới 1.5 giây. Điều này giúp website của bạn nhanh chóng được Google xếp hạng cao, tối ưu tỷ lệ chuyển đổi khách hàng và tiết kiệm hàng chục triệu chi phí quảng cáo.",
      keyBenefits: [
        "Tối ưu điểm Google PageSpeed Insights Xanh (85-95+) cả Desktop & Mobile",
        "Tốc độ mở trang cực nhanh dưới 1.5 giây, nâng cao tỷ lệ chốt đơn hàng",
        "Tích hợp sẵn cấu trúc SEO On-Page, Schema JSON-LD và Sitemap.xml tự động",
        "Tương thích 100% hiển thị trên mọi độ phân giải (iPhone, Android, Tablet, PC)"
      ]
    },
    {
      question: "Ý tưởng kinh doanh và dữ liệu người dùng của tôi có được bảo mật tuyệt đối không?",
      badge: "BẢO MẬT PHÁP LÝ NDA",
      category: "quality",
      answer: "An toàn bảo mật thông tin của khách hàng là ưu tiên số một của chúng tôi. Three Bugs Studio sẵn sàng ký kết Thỏa Thuận Bảo Mật Thông Tin (NDA) pháp lý trước khi tiếp nhận bất kỳ ý tưởng hay dữ liệu kinh doanh nào từ bạn. Toàn bộ mã nguồn dự án được lưu trữ trên Private Repository riêng tư; cơ sở dữ liệu được thiết lập tường lửa và mã hóa chuẩn SSL/TLS. Chúng tôi cam kết không chia sẻ dữ liệu, không thương mại hóa hay tái sử dụng mã nguồn độc quyền của bạn cho bất kỳ bên thứ ba nào.",
      keyBenefits: [
        "Ký kết thỏa thuận bảo mật NDA pháp lý trước khi bắt đầu tiếp nhận dự án",
        "Mã nguồn được lưu trữ tại Private Repository bảo mật tuyệt đối của khách hàng",
        "Cơ sở dữ liệu mã hóa chuẩn công nghiệp SSL/TLS, ngăn chặn rò rỉ dữ liệu",
        "Cam kết bảo vệ bản quyền ý tưởng và không tái sử dụng logic độc quyền cho đối thủ"
      ]
    },
    {
      question: "Sau khi bàn giao, tôi hoặc nhân viên không biết lập trình có tự quản trị website được không?",
      badge: "DỄ QUẢN TRỊ 100%",
      category: "ownership",
      answer: "Hoàn toàn dễ dàng! Hệ thống bảng điều khiển quản trị (CMS Dashboard) được chúng tôi tùy biến thân thiện bằng Tiếng Việt hoặc Tiếng Anh, giao diện rõ ràng như sử dụng mạng xã hội. Khi bàn giao, Studio cung cấp kèm Video hướng dẫn thao tác thực tế và tài liệu chi tiết từng bước: từ đăng sản phẩm, sửa giá, thay đổi hình ảnh banner, cập nhật bài viết cho đến xem báo cáo đơn hàng. Ngoài ra, đội ngũ kỹ sư sẽ có buổi hướng dẫn trực tiếp 1:1 qua Google Meet để nhân viên của bạn có thể tự tin vận hành trơn tru ngay từ ngày đầu tiên.",
      keyBenefits: [
        "Hệ thống quản trị (CMS) trực quan, nhân viên không biết code vẫn dùng dễ dàng",
        "Bàn giao kèm Video quay màn hình hướng dẫn thao tác chi tiết từng bước",
        "Buổi đào tạo trực tiếp 1:1 qua Google Meet giải đáp mọi thao tác quản trị",
        "Tài liệu số lưu trữ nội bộ hỗ trợ tra cứu nhanh bất kỳ lúc nào"
      ]
    }
  ],
  en: [
    {
      question: "Do clients receive 100% full source code ownership and system data upon completion?",
      badge: "100% FULL OWNERSHIP",
      category: "ownership",
      answer: "Yes, you own 100% of your product! Upon project completion, Three Bugs Studio hands over full, clean source code repositories on GitHub/GitLab, PostgreSQL/Supabase database schemas, Cloud hosting configurations (Vercel/Docker), and raw Figma design files. We never inject proprietary locks or enforce recurring software licensing fees. You retain permanent freedom to backup, host independently, or delegate further development to your internal engineers at any time (Zero Vendor Lock-in).",
      keyBenefits: [
        "Full independent GitHub/GitLab source code repository handover",
        "Zero recurring monthly or annual source code licensing fees",
        "100% data autonomy with zero vendor lock-in",
        "Complete Figma master design assets and system architecture blueprints"
      ]
    },
    {
      question: "How is project pricing calculated? Does the Studio guarantee zero hidden fees?",
      badge: "ZERO HIDDEN FEES",
      category: "pricing",
      answer: "Three Bugs Studio strictly guarantees zero unexpected hidden fees! Every project quote is fixed-scope based on an itemized Scope of Work mutually agreed upon before kickoff. Payments are divided across 3 transparent delivery phases: you only disburse funds for the next phase once you have inspected and fully approved the deliverables of the previous phase. Should you wish to expand functionality, we provide clear separate estimates and proceed only upon your consent.",
      keyBenefits: [
        "Transparent fixed-scope quotes with zero unexpected surcharges",
        "Flexible milestone payments across verified delivery phases",
        "Next milestone payment released only upon your explicit satisfaction",
        "Tailored infrastructure cost optimization on Vercel and Supabase"
      ]
    },
    {
      question: "What is your warranty policy, bug-fixing coverage, and post-launch maintenance SLA?",
      badge: "UP TO 12-MONTH WARRANTY",
      category: "warranty",
      answer: "All solutions delivered by Three Bugs Studio include 100% FREE technical warranty coverage for 3 to 12 months (depending on your project tier). During this warranty period, any functional bugs or regressions arising from delivered systems are resolved without extra charge. We commit to a rapid 1–2 hour SLA response for critical operational disruptions, along with configuring automated daily backups so your business operates with peace of mind.",
      keyBenefits: [
        "100% free technical warranty coverage for 3 to 12 months post-launch",
        "Comprehensive bug-fixing with priority 1–2h emergency SLA response",
        "Automated daily database backups and 99.9% uptime health monitoring",
        "Lifetime technical advisory support even after the warranty period"
      ]
    },
    {
      question: "Who will I collaborate with? Do I have to communicate through intermediary sales reps?",
      badge: "DIRECT 1:1 ENGINEERS",
      category: "ownership",
      answer: "You collaborate directly 1-on-1 with our core software engineers and UI/UX designers! We operate strictly under a Direct Engineer Partnership model, eliminating sales agents and middlemen who frequently misinterpret technical specifications and inflate agency fees. You receive authentic architectural advice tailored to your business model, prompt problem resolution, and more than 50% faster turnaround time on all communications.",
      keyBenefits: [
        "Direct collaboration with our 5 core engineering and design leads",
        "Zero sales middlemen, eliminating communication bottlenecks and spec misunderstandings",
        "Practical engineering advice aligned with real business ROI",
        "Dedicated VIP messaging channels on Zalo, Telegram, or Discord"
      ]
    },
    {
      question: "How does the Studio guarantee delivery deadlines? Can I track live progress in real-time?",
      badge: "ON-TIME GUARANTEE",
      category: "warranty",
      answer: "We guarantee delivery timelines in formal contracts: typically 1–3 weeks for Corporate & E-Commerce sites and 4–6 weeks for complex Web Apps and AI platforms. Throughout development, you receive access to a dedicated Live Staging/Demo link to test newly shipped screens every week directly on your mobile device and desktop. Our contracts feature clear milestone clauses: if delays occur due to studio fault, we honor penalty credits or complimentary maintenance extensions.",
      keyBenefits: [
        "Swift turnaround: 1–3 weeks for Web/E-commerce, 4–6 weeks for Web Apps",
        "Live weekly staging links accessible on mobile and desktop devices",
        "Legally committed delivery milestones in binding contracts",
        "Compensation credits or free maintenance extensions if deadlines slip"
      ]
    },
    {
      question: "Does the delivered website meet Google SEO standards and high mobile performance scores?",
      badge: "SEO & 95+ SPEED BUILT-IN",
      category: "quality",
      answer: "Absolutely! Every project shipped by Three Bugs Studio is audited and optimized to achieve Green Google PageSpeed Insights ratings (85 – 95+) across both Desktop and Mobile. We build in comprehensive On-Page SEO: Open Graph social previews, Schema JSON-LD structured data, automated XML sitemaps, and semantic HTML5 with sub-1.5 second page load speeds. This boosts Google rankings, maximizes conversion rates, and saves thousands of dollars in ad spend.",
      keyBenefits: [
        "Green Google PageSpeed Insights scores (85–95+) on Desktop & Mobile",
        "Ultra-fast sub-1.5 second load times to maximize conversion rates",
        "Built-in On-Page SEO, Schema JSON-LD metadata, and auto-generated XML sitemaps",
        "100% fluid responsiveness across iPhone, Android, iPad, and 4K displays"
      ]
    },
    {
      question: "Will my business idea and customer database be kept strictly confidential?",
      badge: "STRICT NDA PRIVACY",
      category: "quality",
      answer: "Customer confidentiality and data protection are our highest priorities. Three Bugs Studio readily signs legally binding Non-Disclosure Agreements (NDAs) prior to receiving your business ideas or proprietary data. All source code is hosted on secure Private Repositories; databases are protected by firewalls and SSL/TLS encryption. We strictly pledge never to sell data, expose business logic, or reuse proprietary code for competitor projects.",
      keyBenefits: [
        "Legally binding mutual NDA signed prior to project intake",
        "Source code locked inside private, client-owned encrypted repositories",
        "Enterprise-grade SSL/TLS database encryption preventing data breaches",
        "Strict intellectual property protection with zero code reuse for competitors"
      ]
    },
    {
      question: "Can non-technical team members easily manage and update the website after handover?",
      badge: "INTUITIVE CMS HANDOVER",
      category: "ownership",
      answer: "Effortlessly! The administrative control panel (CMS Dashboard) is tailored intuitively in Vietnamese or English, making updates as simple as managing social media. Upon handover, we provide custom screen-recorded video walkthroughs and step-by-step documentation covering product uploads, pricing updates, banner swaps, blog editing, and order exports. Furthermore, our engineers conduct a 1-on-1 Google Meet session so your staff feels confident from day one.",
      keyBenefits: [
        "Intuitive CMS dashboard usable by any non-technical staff member",
        "Screen-recorded video tutorials detailing everyday operations",
        "Live 1-on-1 Google Meet training session to answer operational questions",
        "Searchable digital documentation handbook for permanent team reference"
      ]
    }
  ]
};

export const TRANSLATIONS = {
  vi: {
    navWork: "Dự Án",
    navServices: "Dịch Vụ",
    navProcess: "Quy Trình",
    navPricing: "Báo Giá",
    navStudio: "Công Nghệ",
    navTeam: "Đội Ngũ",
    navTestimonials: "Đánh Giá",
    navFaq: "Hỏi Đáp",
    navStartProject: "Khởi Đầu Dự Án",
    navInquiries: "Liên Hệ",

    heroTag: "THIẾT KẾ VÀ PHÁT TRIỂN WEBSITE CHUYÊN NGHIỆP",
    heroHeading: "Chúng Tôi Xây Dựng Website và Phần Mềm",
    heroDesc: "Three Bugs Studio là đội ngũ gồm 5 thành viên lập trình viên & thiết kế chuyên nghiệp làm việc từ xa (100% Remote), chuyên xây dựng website chất lượng cao, vận hành ổn định và tối ưu hiệu năng.",
    heroExplore: "Khám Phá Các Dự Án",
    heroRecentWork: "Dự án thực tế",
    heroPillars: "Trụ Cột Thiết Kế",
    heroPillarsDesc: "Mọi trang web tốt đều cần giao diện dễ nhìn, mã nguồn tối ưu và tốc độ tải trang nhanh chóng.",

    aboutLabel: "01 // CHÂN DUNG STUDIO",
    aboutHeading: "Lập trình thực tế để đưa ý tưởng kinh doanh của bạn lên internet.",
    aboutBody1: "Tại Three Bugs Studio, chúng tôi tập trung xây dựng trang web hoạt động ổn định và lâu dài. Thay vì làm các giải pháp tạm thời, chúng tôi đầu tư vào cơ sở dữ liệu gọn gàng và mã nguồn tối ưu để trang web của bạn chạy mượt mà, ổn định.",
    aboutBody2: "Bạn sẽ làm việc trực tiếp với những lập trình viên trực tiếp xây dựng sản phẩm của bạn. Điều này giúp đẩy nhanh tiến độ bàn giao, giảm thiểu hiểu lầm và đảm bảo sản phẩm đúng như mong đợi.",
    aboutStatProjects: "Dự án hoàn thành",
    aboutStatLines: "Dòng mã tối ưu",
    aboutStatCoffee: "Giờ làm việc tập trung",
    aboutStatSatisfied: "Khách hàng tin cậy",

    servicesLabel: "02 // NĂNG LỰC CỐT LÕI",
    servicesHeading: "Các dịch vụ chính chúng tôi cung cấp.",
    servicesLearnMore: "Chi tiết năng lực",

    workLabel: "03 // DỰ ÁN TIÊU BIỂU",
    workHeading: "Dự án tiêu biểu đã bàn giao.",
    workClient: "Khách hàng",
    workTimeline: "Thời gian",
    workOutcome: "Kết quả đạt được",
    workTechStack: "Công nghệ",

    processLabel: "04 // QUY TRÌNH CHUẨN MỰC",
    processHeading: "Quy trình làm việc rõ ràng và minh bạch.",
    processDeliverables: "Sản phẩm bàn giao",

    techLabel: "05 // HỆ THỐNG CÔNG NGHỆ",
    techHeading: "Các công nghệ chúng tôi thường sử dụng.",
    techSubtitle: "Những công nghệ hiện đại giúp trang web tải nhanh, chịu tải tốt và dễ dàng nâng cấp.",
    techPrimary: "Chuyên sâu",
    techCore: "Cốt lõi",

    teamLabel: "06 // ĐỘI NGŨ KỸ THUẬT",
    teamHeading: "Đội ngũ lập trình viên trực tiếp thiết kế sản phẩm.",
    teamBioPrefix: "Tiểu sử",
    teamSpecialties: "Lĩnh vực chuyên sâu",

    testimonialsLabel: "07 // ĐÁNH GIÁ TỪ KHÁCH HÀNG",
    testimonialsHeading: "Ý kiến từ khách hàng đã hợp tác cùng chúng tôi.",

    faqLabel: "08 // THẮC MẮC THƯỜNG GẶP",
    faqHeading: "Giải đáp các câu hỏi thường gặp.",

    contactLabel: "09 // LIÊN HỆ HỢP TÁC",
    contactHeading: "Gửi yêu cầu thiết kế trang web của bạn.",
    contactSubtitle: "Hãy để lại thông tin liên hệ và ý tưởng của bạn. Đội ngũ lập trình viên của chúng tôi sẽ liên hệ lại trong vòng 12 giờ làm việc để tư vấn cụ thể.",
    contactFieldName: "Họ và tên",
    contactFieldEmail: "Địa chỉ email",
    contactFieldCompany: "Tên cửa hàng hoặc công ty",
    contactFieldServices: "Dịch vụ cần tư vấn",
    contactFieldBudget: "Gói cước / Ngân sách lựa chọn",
    contactFieldMessage: "Chi tiết yêu cầu của bạn",
    contactBudgetValue: "Liên Hệ Báo Giá",
    contactBudgetRange1: "Gói 1: Khởi Nghiệp & Landing Page (Liên Hệ Báo Giá)",
    contactBudgetRange2: "Gói 2: Doanh Nghiệp Đa Ngành & E-Commerce (Liên Hệ Báo Giá)",
    contactBudgetRange3: "Gói 3: Web App & Hệ Thống AI Độc Quyền (Liên Hệ Báo Giá)",
    contactBudgetConversionLabel: "Tư vấn & báo giá chi tiết trực tiếp qua Zalo / Hotline",
    contactSendBtn: "GỬI THÔNG TIN YÊU CẦU",
    contactSendingBtn: "ĐANG GỬI THÔNG TIN...",
    contactSuccessTitle: "Gửi thông tin thành công!",
    contactSuccessMessage: "Cảm ơn bạn đã liên hệ. Yêu cầu của bạn đã được gửi trực tiếp đến threebugstudio@gmail.com. Chúng tôi sẽ phản hồi sớm để trao đổi chi tiết về giao diện và lộ trình thực hiện.",
    contactFormError: "Vui lòng điền đầy đủ các thông tin bắt buộc.",

    footerSiteIndex: "MỤC LỤC TRANG",
    footerConnectivity: "KẾT NỐI",
    footerSlogan: "Chúng tôi thiết kế và lập trình các website hoạt động ổn định lâu dài.",
    footerClock: "ĐỒNG HỒ HỆ THỐNG MÁY CHỦ: ",
    footerBackToTop: "VỀ ĐẦU TRANG",
    footerCopyright: "THREE BUGS STUDIO © 2026. BẢO LƯU MỌI QUYỀN."
  },
  en: {
    navWork: "Selected Work",
    navServices: "Services",
    navProcess: "Process",
    navPricing: "Pricing",
    navStudio: "Tech Stack",
    navTeam: "Our Team",
    navTestimonials: "Reviews",
    navFaq: "FAQ",
    navStartProject: "Start Project",
    navInquiries: "Inquiries",

    heroTag: "SOFTWARE DESIGN AND ENGINEERING",
    heroHeading: "We build stable and fast web applications.",
    heroDesc: "Three Bugs Studio is a 100% remote-first team of 5 specialized developers & designers crafting clean, fast, and durable websites.",
    heroExplore: "Explore Selected Work",
    heroRecentWork: "Recent Work",
    heroPillars: "Design Pillars",
    heroPillarsDesc: "Every great product starts with clean architecture, minimalist code, and high end visual layout alignment.",

    aboutLabel: "01 // THE STUDIO PORTRAIT",
    aboutHeading: "Practical coding to launch your business online.",
    aboutBody1: "At Three Bugs Studio, we build software that lasts. Instead of temporary workarounds, we focus on organized database setups and optimal code to keep your website running smoothly at all times.",
    aboutBody2: "You will communicate directly with the programmers building your site. This speeds up delivery, avoids misunderstandings, and guarantees your project meets your exact expectations.",
    aboutStatProjects: "Projects Shipped",
    aboutStatLines: "Lines of Clean Code",
    aboutStatCoffee: "Focused Work Hours",
    aboutStatSatisfied: "Satisfied Customers",

    servicesLabel: "02 // CAPABILITIES",
    servicesHeading: "Core services crafted with absolute precision.",
    servicesLearnMore: "Explore capabilities",

    workLabel: "03 // SELECTED WORK",
    workHeading: "Pristine digital systems for ambitious brands.",
    workClient: "Client",
    workTimeline: "Timeline",
    workOutcome: "Outcome Delivered",
    workTechStack: "Technologies",

    processLabel: "04 // THE STANDARD PROCESS",
    processHeading: "Rigorous, transparent, and practical.",
    processDeliverables: "Key Deliverables",

    techLabel: "05 // SYSTEM TECH STACK",
    techHeading: "Modern architectures built for growth.",
    techSubtitle: "A suite of technologies tested for concurrent traffic, durability, and performance.",
    techPrimary: "Primary",
    techCore: "Core",

    teamLabel: "06 // FOUNDING ENGINEERS",
    teamHeading: "Work directly with the technical architects.",
    teamBioPrefix: "Background",
    teamSpecialties: "Areas of Specialty",

    testimonialsLabel: "07 // TESTIMONIALS",
    testimonialsHeading: "Direct thoughts from founders we have built for.",

    faqLabel: "08 // FREQUENTLY ASKED QUESTIONS",
    faqHeading: "Common questions with clear and direct answers.",

    contactLabel: "09 // THE BLUEPRINT FLOW",
    contactHeading: "Initiate your next product blueprint.",
    contactSubtitle: "Tell us about your technical requirements. Our developers based in Ho Chi Minh City will review and reach out within 12 business hours.",
    contactFieldName: "Full Name",
    contactFieldEmail: "Email Address",
    contactFieldCompany: "Company or Venture",
    contactFieldServices: "Service of Interest",
    contactFieldBudget: "Selected Package / Budget",
    contactFieldMessage: "Project Requirements",
    contactBudgetValue: "Quote on Request",
    contactBudgetRange1: "Package 1: Starter Web & Landing Page (Quote on Request)",
    contactBudgetRange2: "Package 2: Corporate & E-Commerce (Quote on Request)",
    contactBudgetRange3: "Package 3: Custom Web App & AI Platform (Quote on Request)",
    contactBudgetConversionLabel: "Direct project consultation via Zalo / Hotline",
    contactSendBtn: "SEND PROJECT INQUIRY",
    contactSendingBtn: "TRANSMITTING INQUIRY...",
    contactSuccessTitle: "Inquiry Successfully Transmitted!",
    contactSuccessMessage: "Thank you for reaching out. Your inquiry has been transmitted directly to threebugstudio@gmail.com. We will analyze your specifications and follow up shortly.",
    contactFormError: "Please complete all mandatory fields to proceed.",

    footerSiteIndex: "SITE INDEX",
    footerConnectivity: "CONNECTIVITY",
    footerSlogan: "Building digital products with unyielding structural foundations.",
    footerClock: "ENGINE SYSTEM CLOCK: ",
    footerBackToTop: "BACK TO TOP",
    footerCopyright: "THREE BUGS STUDIO © 2026. ALL RIGHTS RESERVED."
  }
};
