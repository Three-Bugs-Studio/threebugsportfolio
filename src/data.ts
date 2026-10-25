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
      title: "Kỹ Thuật Full Stack & Backend (Golang / FastAPI / NestJS)",
      description: "Chúng tôi xây dựng hệ thống máy chủ tốc độ cao bằng Golang, Python FastAPI và Node.js/NestJS, bảo mật doanh nghiệp và cơ sở dữ liệu chịu tải lớn.",
      details: [
        "Lập trình Backend Golang, Python FastAPI & Node.js hiệu năng cao",
        "Xây dựng cổng kết nối RESTful & GraphQL API chuẩn xác",
        "Thiết kế cấu trúc cơ sở dữ liệu PostgreSQL / Supabase",
        "Đóng gói ứng dụng bằng Docker và triển khai lên Cloud VPS"
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
        "Tiếp nhận sự cố, phản hồi trong 4 giờ làm việc",
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
      title: "Full Stack & Modern Backend (Golang / FastAPI / NestJS)",
      description: "We architect high-concurrency server backends using Golang, Python FastAPI, and Node.js/NestJS with enterprise-grade security and robust database performance.",
      details: [
        "High-performance Golang, Python FastAPI & Node.js API development",
        "Scalable REST and GraphQL API endpoints",
        "Relational Database Schema Design",
        "Dockerization and Cloud VPS Deployments"
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
        "Incident intake with a 4-working-hour response",
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
    },
    {
      id: "h1t_micro",
      title: "H1T MICRO",
      client: "Lê Hồng Khánh",
      category: "Nền Tảng Dinh Dưỡng Khoa Học & Định Lượng 22 Vi Chất",
      shortStory: "Hệ thống landing page và ứng dụng theo dõi 22 vi chất dinh dưỡng thiết yếu (10 khoáng chất & 12 vitamin) chuẩn y khoa và dinh dưỡng khoa học (RNI/RDA từ Viện Dinh Dưỡng Quốc Gia & USDA) cho thương hiệu H1T MICRO của Lê Hồng Khánh. Dự án do Duong Phu Dong và Hao Vu trực tiếp lập trình với kiến trúc Frontend Next.js tốc độ cao, Backend Golang xử lý dữ liệu vi chất chuẩn xác, kết hợp cơ sở dữ liệu Supabase, lưu trữ Cloudinary và hạ tầng Cloud VPS Vietnix bảo mật.",
      technologies: ["Next.js", "Golang", "Supabase", "Cloudinary", "VPS Vietnix"],
      timeline: "Đã Triển Khai & Đang Duy Trì",
      outcome: "Xuất sắc đạt #1 Product of the Day trên Unikorn.vn và cán mốc 1.000+ thành viên theo dõi dinh dưỡng khoa học. Nền tảng đạt chứng nhận kiểm định thực tế 99 Performance, 100 SEO, 100 Accessibility trên hạ tầng backend Golang và VPS Vietnix.",
      coverImage: "lehongkhanh",
      metrics: "1.000+ Thành Viên · #1 Unikorn · 99 Perf",
      liveUrl: "https://lehongkhanh.vn"
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
    },
    {
      id: "h1t_micro",
      title: "H1T MICRO",
      client: "Le Hong Khanh",
      category: "HealthTech & Scientific Micronutrient Platform",
      shortStory: "A scientific landing platform and web application quantifying 22 essential micronutrients (10 minerals & 12 vitamins) based on RNI/RDA recommendations from the National Institute of Nutrition & USDA for H1T MICRO (Le Hong Khanh). Engineered end-to-end by Duong Phu Dong and Hao Vu with a high-performance Next.js frontend, Golang backend, Supabase database, Cloudinary media CDN, and secure Vietnix Cloud VPS hosting.",
      technologies: ["Next.js", "Golang", "Supabase", "Cloudinary", "VPS Vietnix"],
      timeline: "Deployed & Active Maintenance",
      outcome: "Awarded #1 Product of the Day on Unikorn.vn and scaled past 1,000+ active members tracking micronutrients. Achieved verified benchmarks: 99 Performance, 100 SEO, 100 Accessibility powered by compiled Golang on Vietnix Cloud VPS.",
      coverImage: "lehongkhanh",
      metrics: "1,000+ Members · #1 Unikorn · 99 Perf",
      liveUrl: "https://lehongkhanh.vn"
    }
  ]
};

export const PROCESS_DATA: Record<"vi" | "en", ProcessStep[]> = {
  vi: [
    {
      number: "01",
      title: "Khám Phá",
      description: "Chúng tôi cùng bạn trao đổi chi tiết về ý tưởng, xác định các chức năng cần thiết của trang web và lập kế hoạch triển khai cụ thể để phù hợp với nhu cầu thực tế.",
      duration: "1 - 5 ngày",
      deliverables: ["Tài liệu Đặc tả Sản phẩm", "Sơ đồ Kiến trúc Hệ thống", "Lộ trình và Dự toán Chi phí"]
    },
    {
      number: "02",
      title: "Thiết Kế",
      description: "Chúng tôi phác thảo sơ đồ trang web và thiết kế giao diện trên Figma để bạn dễ dàng hình dung. Mọi nút bấm, màu sắc và kiểu chữ đều được thiết kế rõ ràng, nhất quán.",
      duration: "Theo gói",
      deliverables: ["Bản vẽ giao diện mẫu", "Bộ thành phần thiết kế đồng bộ", "Sơ đồ hoạt động của người dùng"]
    },
    {
      number: "03",
      title: "Xây Dựng",
      description: "Chúng tôi tiến hành lập trình giao diện bằng React và máy chủ bằng các công nghệ hiện đại. Cơ sở dữ liệu và hệ thống xử lý được tối ưu hóa để trang web tải nhanh và hoạt động bền bỉ.",
      duration: "Theo gói",
      deliverables: ["Bản dựng thử nghiệm", "Tài liệu hướng dẫn kỹ thuật", "Hệ thống cơ sở dữ liệu hoàn chỉnh"]
    },
    {
      number: "04",
      title: "Triển Khai",
      description: "Chúng tôi kiểm tra bảo mật, tối ưu hóa tốc độ tải trang và chính thức đưa trang web của bạn lên hoạt động trên mạng internet.",
      duration: "1 - 3 ngày",
      deliverables: ["Đưa trang web hoạt động chính thức", "Cấu hình quy trình vận hành tự động", "Báo cáo kiểm tra hiệu năng ổn định"]
    },
    {
      number: "05",
      title: "Đồng Hành",
      description: "Chúng tôi bàn giao đầy đủ mã nguồn và tài liệu hướng dẫn vận hành cho bạn. Sau đó bảo hành theo thời hạn của từng gói và hỗ trợ nâng cấp theo giờ khi cần.",
      duration: "Theo gói",
      deliverables: ["Mã nguồn và hướng dẫn vận hành", "Hệ thống kiểm tra trạng thái hoạt động", "Hỗ trợ định kỳ hàng tháng"]
    }
  ],
  en: [
    {
      number: "01",
      title: "Discover",
      description: "We discuss details of your idea, identify core website features, and establish a clear execution plan to fit your exact business goals.",
      duration: "1 - 5 days",
      deliverables: ["Product Specification Document", "System Architecture Outline", "Project Timeline and Costing"]
    },
    {
      number: "02",
      title: "Design",
      description: "We map out the user flow and design Figma templates. Every button, color, and typography element is structured clearly and consistently.",
      duration: "Per package",
      deliverables: ["Interactive Prototypes", "Design Token Library", "User Flow Diagrams"]
    },
    {
      number: "03",
      title: "Build",
      description: "We write clean, typed React code and set up robust backend endpoints. Database and system queries are optimized to guarantee fast load times.",
      duration: "Per package",
      deliverables: ["Staging Ready Application Build", "API Documentation", "Database Schemas and Tables"]
    },
    {
      number: "04",
      title: "Ship",
      description: "We audit platform security, tune performance scores, and officially deploy your live website to the cloud network.",
      duration: "1 - 3 days",
      deliverables: ["Production Launch", "Automated Release Pipeline", "Performance Stability Report"]
    },
    {
      number: "05",
      title: "Support",
      description: "We hand over full source code and documentation. After that you get the warranty of your package and hourly support for upgrades.",
      duration: "Per package",
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
      id: "template_landing",
      badge: "TEMPLATE // GIAO NHANH",
      name: "Landing Từ Template",
      tagline: "Chọn mẫu có sẵn, chúng tôi thay logo, màu và nội dung theo thương hiệu của bạn. Dành cho cá nhân, spa, salon, quán ăn, shop nhỏ.",
      priceVnd: "Từ 2,5 triệu",
      priceUsd: "hoặc 299.000đ/tháng (tối thiểu 12 tháng)",
      timeline: "2 - 3 ngày làm việc",
      paymentNote: "Trọn gói: 50% đặt cọc, 50% khi bàn giao",
      buttonText: "XEM CÁC MẪU WEBSITE",
      buttonHref: "/templates",
      features: [
        {
          title: "Khách Nhận Được",
          items: [
            "1 trang landing dựng từ mẫu có sẵn, thay logo, màu thương hiệu, nội dung và hình ảnh",
            "Hiển thị tốt trên điện thoại & máy tính, tải dưới 2 giây",
            "Nút Zalo, gọi điện, Messenger; form liên hệ gửi về email hoặc Google Sheet",
            "SEO cơ bản: tiêu đề, mô tả, ảnh khi chia sẻ lên Facebook / Zalo",
            "Gắn tên miền của khách, hosting Vercel miễn phí cho trang nhỏ",
            "2 lượt chỉnh sửa trước khi bàn giao, bảo hành lỗi kỹ thuật 14 ngày",
            "Trả theo tháng: đã gồm tên miền .com, chỉnh sửa nhỏ tối đa 1 giờ/tháng; đủ 12 tháng website thuộc về khách"
          ]
        },
        {
          title: "Không Bao Gồm",
          items: [
            "Thiết kế riêng, viết nội dung, chụp ảnh sản phẩm",
            "Tên miền với gói trọn gói (khoảng 300 - 500k/năm, khách tự trả)"
          ]
        }
      ],
      benefits: []
    },
    {
      id: "phase_1_mvp",
      badge: "LANDING & GIỚI THIỆU // 3 PHASE",
      name: "Landing & Web Giới Thiệu Thiết Kế Riêng",
      tagline: "Thiết kế độc quyền trên Figma cho thương hiệu mới, landing chạy quảng cáo, web giới thiệu công ty.",
      priceVnd: "Từ 8 triệu",
      priceUsd: "Báo giá theo quy mô khách hàng",
      timeline: "1 - 2 Tuần",
      paymentNote: "30% đặt cọc · 40% xong lập trình · 30% khi bàn giao",
      features: [
        {
          title: "Mức Giá Theo Quy Mô",
          items: [
            "Khách nhỏ (cá nhân, spa, quán, shop): 8 - 15 triệu",
            "Start-up: 15 - 30 triệu",
            "Doanh nghiệp: 30 - 60 triệu (song ngữ Việt/Anh, theo bộ nhận diện có sẵn, hợp đồng & NDA)"
          ]
        },
        {
          title: "Khách Nhận Được",
          items: [
            "Thiết kế riêng trên Figma, 2 vòng chỉnh sửa thiết kế",
            "Website tối đa 5 trang (Trang chủ, Giới thiệu, Dịch vụ, Dự án, Liên hệ)",
            "Code React / Next.js, điểm Google Lighthouse trên 90 trên điện thoại",
            "Gắn Google Analytics & Facebook Pixel để đo hiệu quả quảng cáo",
            "SEO kỹ thuật chuẩn: sitemap, schema, ảnh chia sẻ mạng xã hội",
            "Bàn giao 100% mã nguồn & file Figma, 1 buổi hướng dẫn sử dụng",
            "Bảo hành lỗi kỹ thuật 1 tháng, hỗ trợ giờ hành chính, phản hồi trong 4 giờ làm việc"
          ]
        },
        {
          title: "Không Bao Gồm",
          items: [
            "Viết nội dung, chụp ảnh; tên miền & hosting trả phí (khách tự trả)"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Đặt Cọc Phase 1", percentage: "30%", description: "Chốt yêu cầu & thiết kế Figma" },
        { stage: "Nghiệm Thu Phase 2", percentage: "40%", description: "Hoàn thiện lập trình giao diện" },
        { stage: "Nghiệm Thu Phase 3", percentage: "30%", description: "Gắn tên miền, bàn giao mã nguồn & hướng dẫn" }
      ]
    },
    {
      id: "phase_2_fullstack",
      badge: "KHUYÊN DÙNG ★ // 3 PHASE",
      name: "Gói Doanh Nghiệp & E-Commerce",
      tagline: "Website có trang quản trị cho doanh nghiệp, bán hàng online, đặt lịch, khóa học, bất động sản, du lịch.",
      priceVnd: "Từ 25 triệu",
      priceUsd: "Báo giá theo quy mô khách hàng",
      timeline: "3 - 6 Tuần",
      recommended: true,
      paymentNote: "30% đặt cọc · 40% xong lập trình · 30% khi bàn giao",
      features: [
        {
          title: "Mức Giá Theo Quy Mô",
          items: [
            "Khách nhỏ: 25 - 50 triệu",
            "Start-up: 50 - 120 triệu",
            "Doanh nghiệp: 120 - 300 triệu (bảo hành 6 tháng, hợp đồng & NDA)"
          ]
        },
        {
          title: "Khách Nhận Được",
          items: [
            "Toàn bộ quyền lợi của gói Landing & Web Giới Thiệu",
            "Trang quản trị (CMS) tự sửa bài viết, sản phẩm, dịch vụ, đơn hàng",
            "1 tính năng chính: giỏ hàng & thanh toán QR (SePay / VietQR), đặt lịch, hoặc khóa học",
            "Cơ sở dữ liệu PostgreSQL / Supabase, sao lưu tự động hằng ngày",
            "Phân quyền Admin & Nhân viên; kiểm thử đặt hàng, thanh toán trước khi ra mắt",
            "Bàn giao mã nguồn, tài khoản quản trị & tài liệu hướng dẫn tiếng Việt",
            "Bảo hành lỗi kỹ thuật 3 tháng, hỗ trợ giờ hành chính, phản hồi trong 4 giờ làm việc"
          ]
        },
        {
          title: "Không Bao Gồm",
          items: [
            "Phí server sau năm đầu, phí cổng thanh toán, nhập liệu sản phẩm hàng loạt (báo giá riêng)"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Khởi Động Phase 1", percentage: "30%", description: "Thiết kế UI/UX & cấu trúc cơ sở dữ liệu" },
        { stage: "Phát Triển Phase 2", percentage: "40%", description: "Hoàn thiện trang quản trị, giỏ hàng & thanh toán" },
        { stage: "Nghiệm Thu Phase 3", percentage: "30%", description: "Kiểm thử, bàn giao 100% mã nguồn & tài liệu" }
      ]
    },
    {
      id: "phase_3_enterprise",
      badge: "WEB APP & AI // 3 PHASE",
      name: "Gói Web App & Hệ Thống AI",
      tagline: "Web App, Mobile App, hệ thống quản lý (CRM / ERP) và tích hợp AI cho start-up và doanh nghiệp.",
      priceVnd: "Từ 150 triệu",
      priceUsd: "Doanh nghiệp: báo giá sau khảo sát",
      timeline: "MVP 6 - 10 Tuần",
      paymentNote: "30% sau khảo sát · 40% theo tiến độ · 30% khi bàn giao",
      features: [
        {
          title: "Mức Giá Theo Quy Mô",
          items: [
            "Start-up (bản MVP): 150 - 400 triệu",
            "Doanh nghiệp: từ 400 triệu, báo giá theo từng giai đoạn sau buổi khảo sát",
            "Bảo trì sau bàn giao: gói hằng tháng từ 5 - 20 triệu/tháng tùy quy mô hệ thống"
          ]
        },
        {
          title: "Khách Nhận Được",
          items: [
            "Buổi khảo sát & tài liệu đặc tả hệ thống, khách giữ tài liệu kể cả khi không làm tiếp",
            "Web App / Mobile App theo đặc tả đã chốt",
            "Tích hợp AI: chatbot, gợi ý tự động, xử lý tài liệu",
            "Phân quyền nhiều vai trò, đăng nhập bảo mật, lưu lịch sử thao tác",
            "Docker, tự động triển khai (CI/CD), môi trường thử nghiệm riêng",
            "Demo tiến độ mỗi 2 tuần",
            "Bàn giao mã nguồn, tài liệu kiến trúc & đào tạo đội vận hành; bảo hành 3 tháng"
          ]
        },
        {
          title: "Không Bao Gồm",
          items: [
            "Phí API AI (OpenAI, Claude, Gemini...) và server: khách trả trực tiếp cho nhà cung cấp"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Phân Tích Phase 1", percentage: "30%", description: "Chốt tài liệu đặc tả & kiến trúc hệ thống" },
        { stage: "Lập Trình Phase 2", percentage: "40%", description: "Lập trình App, API & tích hợp AI, demo mỗi 2 tuần" },
        { stage: "Nghiệm Thu Phase 3", percentage: "30%", description: "Triển khai server, bàn giao mã nguồn & đào tạo" }
      ]
    },
    {
      id: "phase_maintenance",
      badge: "HẬU MÃI & THEO GIỜ // HOURLY SLA",
      name: "Gói Bảo Trì & Nâng Cấp Theo Giờ",
      tagline: "Dành cho website / hệ thống đã hết bảo hành hoặc cần kỹ sư sửa lỗi, tối ưu tốc độ, thêm tính năng theo giờ, không phí cố định hằng tháng.",
      priceVnd: "Từ 300.000đ/giờ",
      priceUsd: "Mua trước 10 giờ giảm 10%, 20 giờ giảm 15%",
      timeline: "Linh hoạt / Gói 10h - 20h",
      pricingType: "hourly",
      paymentNote: "Chỉ trả đúng số giờ làm thực tế, nghiệm thu xong mới thanh toán",
      buttonText: "LIÊN HỆ HOÀNG ĐỖ (BẢO TRÌ THEO GIỜ)",
      phases: [
        { number: "Bước 1", title: "Khảo Sát & Ước Lượng Giờ", duration: "1 - 2 Giờ", description: "Tiếp nhận yêu cầu hoặc lỗi, chốt danh sách việc và ước lượng số giờ trước khi làm." },
        { number: "Bước 2", title: "Thực Thi & Chấm Công", duration: "Linh hoạt", description: "Kỹ sư sửa lỗi hoặc code tính năng, ghi nhận thời gian minh bạch bằng công cụ chấm công." },
        { number: "Bước 3", title: "Nghiệm Thu & Thanh Toán", duration: "Hoàn tất", description: "Khách kiểm tra trên môi trường thực tế và thanh toán đúng số giờ làm việc." }
      ],
      features: [
        {
          title: "Đơn Giá Theo Quy Mô",
          items: [
            "Khách nhỏ: 300.000đ/giờ",
            "Start-up: 400.000đ/giờ",
            "Doanh nghiệp: 600.000đ/giờ",
            "Sửa lỗi khẩn cấp ngoài giờ hành chính: x1,5 đơn giá"
          ]
        },
        {
          title: "Khách Nhận Được",
          items: [
            "Đầu mối duy nhất: Hoàng Đỗ (0392.996.307 / Zalo) tiếp nhận & điều phối",
            "Ước lượng số giờ trước khi làm, không phát sinh bất ngờ",
            "Sửa lỗi, vá bảo mật, gia hạn SSL, tối ưu tốc độ & cơ sở dữ liệu",
            "Thêm tính năng mới, nâng cấp phiên bản React / Next.js / Node.js an toàn",
            "Sao lưu mã nguồn & dữ liệu trước khi can thiệp",
            "Báo cáo chi tiết từng việc kèm số giờ và mã commit",
            "Phản hồi trong 4 giờ làm việc, không ràng buộc phí duy trì hằng tháng"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Tiếp Nhận", percentage: "Ước lượng", description: "Khảo sát yêu cầu và gửi bản ước lượng giờ" },
        { stage: "Xử Lý", percentage: "Thực thi", description: "Sửa lỗi / phát triển tính năng, chấm công minh bạch" },
        { stage: "Nghiệm Thu", percentage: "Thanh toán", description: "Khách kiểm tra kết quả, nhận báo cáo và thanh toán theo giờ" }
      ]
    }
  ],
  en: [
    {
      id: "template_landing",
      badge: "TEMPLATE // FAST DELIVERY",
      name: "Landing From a Template",
      tagline: "Pick a ready-made template and we apply your logo, colours and content. For individuals, spas, salons, restaurants and small shops.",
      priceVnd: "From 2.5M VND",
      priceUsd: "≈ US$95 · or 299k VND/month (12-month minimum)",
      timeline: "2 - 3 working days",
      paymentNote: "One-off: 50% deposit, 50% on handover",
      buttonText: "BROWSE TEMPLATES",
      buttonHref: "/templates",
      features: [
        {
          title: "What You Get",
          items: [
            "One landing page built from a template with your logo, brand colours, content and images",
            "Works well on phone and desktop, loads in under 2 seconds",
            "Zalo, call and Messenger buttons; contact form to email or Google Sheets",
            "Basic SEO: title, description and social share image for Facebook / Zalo",
            "Connected to your domain, free Vercel hosting for small sites",
            "2 revision rounds before handover, 14-day technical warranty",
            "Monthly plan: includes a .com domain and up to 1 hour of small edits per month; the site is yours after 12 months"
          ]
        },
        {
          title: "Not Included",
          items: [
            "Custom design, copywriting, product photography",
            "Domain on the one-off plan (about 300 - 500k VND/year, paid by you)"
          ]
        }
      ],
      benefits: []
    },
    {
      id: "phase_1_mvp",
      badge: "LANDING & COMPANY SITE // 3 PHASES",
      name: "Custom-Designed Landing & Company Site",
      tagline: "Exclusive Figma design for new brands, ad landing pages and company websites.",
      priceVnd: "From 8M VND",
      priceUsd: "≈ US$300 · priced by client size",
      timeline: "1 - 2 Weeks",
      paymentNote: "30% deposit · 40% after development · 30% on handover",
      features: [
        {
          title: "Price by Client Size",
          items: [
            "Small business (individuals, spas, cafés, shops): 8 - 15M VND",
            "Start-up: 15 - 30M VND",
            "Enterprise: 30 - 60M VND (bilingual VI/EN, existing brand guidelines, contract & NDA)"
          ]
        },
        {
          title: "What You Get",
          items: [
            "Custom Figma design with 2 design revision rounds",
            "Up to 5 pages (Home, About, Services, Projects, Contact)",
            "React / Next.js build with a Google Lighthouse mobile score above 90",
            "Google Analytics & Facebook Pixel set up to measure ad performance",
            "Technical SEO: sitemap, schema, social share images",
            "100% source code and Figma files handed over, plus one training session",
            "1-month technical warranty, business-hours support with a 4-working-hour response"
          ]
        },
        {
          title: "Not Included",
          items: [
            "Copywriting, photography; paid domain & hosting (paid by you)"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Phase 1 Deposit", percentage: "30%", description: "Requirements agreed & Figma design" },
        { stage: "Phase 2 Sign-off", percentage: "40%", description: "Front-end development complete" },
        { stage: "Phase 3 Sign-off", percentage: "30%", description: "Domain connected, source code & training handed over" }
      ]
    },
    {
      id: "phase_2_fullstack",
      badge: "RECOMMENDED ★ // 3 PHASES",
      name: "Business & E-Commerce",
      tagline: "Websites with an admin panel for businesses, online stores, bookings, courses, real estate and travel.",
      priceVnd: "From 25M VND",
      priceUsd: "≈ US$950 · priced by client size",
      timeline: "3 - 6 Weeks",
      recommended: true,
      paymentNote: "30% deposit · 40% after development · 30% on handover",
      features: [
        {
          title: "Price by Client Size",
          items: [
            "Small business: 25 - 50M VND",
            "Start-up: 50 - 120M VND",
            "Enterprise: 120 - 300M VND (6-month warranty, contract & NDA)"
          ]
        },
        {
          title: "What You Get",
          items: [
            "Everything in the Landing & Company Site package",
            "Admin panel (CMS) to edit posts, products, services and orders yourself",
            "One core feature: cart & QR payments (SePay / VietQR), bookings, or courses",
            "PostgreSQL / Supabase database with automatic daily backups",
            "Admin & staff roles; ordering and payments tested before launch",
            "Source code, admin accounts and a written user guide handed over",
            "3-month technical warranty, business-hours support with a 4-working-hour response"
          ]
        },
        {
          title: "Not Included",
          items: [
            "Server costs after year one, payment gateway fees, bulk product data entry (quoted separately)"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Phase 1 Kick-off", percentage: "30%", description: "UI/UX design & database structure" },
        { stage: "Phase 2 Build", percentage: "40%", description: "Admin panel, cart & payments complete" },
        { stage: "Phase 3 Sign-off", percentage: "30%", description: "Testing, 100% source code & documentation" }
      ]
    },
    {
      id: "phase_3_enterprise",
      badge: "WEB APP & AI // 3 PHASES",
      name: "Web App & AI Systems",
      tagline: "Web apps, mobile apps, management systems (CRM / ERP) and AI integration for start-ups and enterprises.",
      priceVnd: "From 150M VND",
      priceUsd: "≈ US$5,700 · enterprise quoted after discovery",
      timeline: "MVP 6 - 10 Weeks",
      paymentNote: "30% after discovery · 40% on progress · 30% on handover",
      features: [
        {
          title: "Price by Client Size",
          items: [
            "Start-up (MVP): 150 - 400M VND",
            "Enterprise: from 400M VND, quoted per stage after a discovery session",
            "Post-launch maintenance: monthly plans from 5 - 20M VND depending on system size"
          ]
        },
        {
          title: "What You Get",
          items: [
            "Discovery session and system specification, which you keep even if you stop there",
            "Web or mobile app built to the agreed specification",
            "AI integration: chatbots, recommendations, document processing",
            "Multiple user roles, secure login and activity history",
            "Docker, automated deployment (CI/CD) and a separate staging environment",
            "Progress demo every 2 weeks",
            "Source code, architecture docs and team training; 3-month warranty"
          ]
        },
        {
          title: "Not Included",
          items: [
            "AI API (OpenAI, Claude, Gemini...) and server costs, paid directly to the provider"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Phase 1 Discovery", percentage: "30%", description: "Specification & system architecture agreed" },
        { stage: "Phase 2 Build", percentage: "40%", description: "App, APIs & AI integration, demo every 2 weeks" },
        { stage: "Phase 3 Sign-off", percentage: "30%", description: "Server deployment, source code & training" }
      ]
    },
    {
      id: "phase_maintenance",
      badge: "AFTERCARE & HOURLY // HOURLY SLA",
      name: "Hourly Maintenance & Upgrades",
      tagline: "For sites and systems out of warranty, or teams that need engineers for fixes, speed work and new features by the hour, with no fixed monthly fee.",
      priceVnd: "From 300k VND/hour",
      priceUsd: "≈ US$12/hour · 10% off 10-hour blocks, 15% off 20-hour blocks",
      timeline: "Flexible / 10h - 20h blocks",
      pricingType: "hourly",
      paymentNote: "Pay only for hours actually worked, after you sign off",
      buttonText: "CONTACT HOANG DO (HOURLY SUPPORT)",
      phases: [
        { number: "Step 1", title: "Review & Estimate", duration: "1 - 2 Hours", description: "We take your request or bug, agree the task list and estimate the hours before starting." },
        { number: "Step 2", title: "Work & Time Tracking", duration: "Flexible", description: "Engineers fix or build, with every hour logged in a time tracker." },
        { number: "Step 3", title: "Sign-off & Payment", duration: "On completion", description: "You check the result live and pay for the hours worked." }
      ],
      features: [
        {
          title: "Rate by Client Size",
          items: [
            "Small business: 300k VND/hour",
            "Start-up: 400k VND/hour",
            "Enterprise: 600k VND/hour",
            "Urgent out-of-hours fixes: 1.5x rate"
          ]
        },
        {
          title: "What You Get",
          items: [
            "One point of contact: Hoang Do (0392.996.307 / Zalo) takes and coordinates requests",
            "Hours estimated before work starts, no surprises",
            "Bug fixes, security patches, SSL renewal, speed and database tuning",
            "New features and safe React / Next.js / Node.js upgrades",
            "Code and data backed up before any change",
            "Detailed report per task with hours and commit links",
            "Response within 4 working hours, no monthly commitment"
          ]
        }
      ],
      benefits: [],
      milestones: [
        { stage: "Intake", percentage: "Estimate", description: "Review the request and send an hour estimate" },
        { stage: "Execution", percentage: "Work", description: "Fix or build with transparent time tracking" },
        { stage: "Sign-off", percentage: "Payment", description: "You check results, get the report and pay by the hour" }
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
      role: "Kỹ sư DevOps & Full Stack (FastAPI / Node.js) Doanh nghiệp",
      bio: "Kỹ sư đám mây và lập trình viên Full Stack với kinh nghiệm thực chiến phát triển giải pháp doanh nghiệp trên RMIT Showcase (Project Luvcraft). Anh phụ trách kiến trúc vi dịch vụ (FastAPI, RabbitMQ, Celery), Docker container hóa, cơ sở dữ liệu PostgreSQL và hạ tầng CI/CD chịu tải cao.",
      specialties: ["Kiến trúc DevOps & Docker", "Backend FastAPI & Python", "Hệ thống Microservice", "Cơ sở dữ liệu PostgreSQL"],
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
      diagramRole: "DEVOPS & FASTAPI FULLSTACK PIPELINE",
      nodeId: "node_hohuy",
      connectsTo: ["node_hoangdong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Hao Vu",
      role: "Kỹ sư Backend Golang & Cơ sở dữ liệu Doanh nghiệp",
      bio: "Kỹ sư chuyên sâu về lập trình backend Golang & Node.js, API bảo mật và tối ưu dữ liệu quy mô doanh nghiệp trên RMIT Showcase (Project Luvcraft). Anh phụ trách kiến trúc backend Golang hiệu năng cao cho H1T MICRO, thiết kế lược đồ cơ sở dữ liệu tối ưu, phân quyền đa tài khoản RBAC và tích hợp các pipeline dữ liệu thông minh.",
      specialties: ["Lập trình Backend Golang", "Tối ưu hóa CSDL", "Bảo mật & Phân quyền RBAC", "Thiết kế API Doanh nghiệp"],
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
      diagramRole: "GOLANG BACKEND & DATABASE ARCHITECT",
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
      role: "DevOps & Enterprise Full Stack (FastAPI / Node.js) Engineer",
      bio: "Cloud infrastructure and full-stack engineer with proven enterprise development experience featured on RMIT Showcase (Project Luvcraft). He architects asynchronous pipelines (FastAPI, RabbitMQ, Celery), Docker containers, PostgreSQL, and robust CI/CD environments.",
      specialties: ["DevOps & Docker Setup", "FastAPI & Python Backend", "Microservice Systems", "PostgreSQL Database"],
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
      diagramRole: "DEVOPS & FASTAPI FULLSTACK PIPELINE",
      nodeId: "node_hohuy",
      connectsTo: ["node_hoangdong"],
      showcaseUrl: "https://www.rmitvn-showcase.com/nightswatch10f37c09",
      showcaseLabel: "RMIT Enterprise Showcase (Project Luvcraft)",
      highlightBadge: "RMIT SHOWCASE"
    },
    {
      name: "Hao Vu",
      role: "Enterprise Backend & Golang Engineer",
      bio: "Server-side and database architect with proven enterprise project delivery on RMIT Showcase (Project Luvcraft). He builds secure Golang backend APIs, optimized PostgreSQL schemas, Role-Based Access Control (RBAC), and high-throughput data pipelines.",
      specialties: ["Golang Backend Engineering", "Database Optimization", "Enterprise RBAC Security", "API Architecture"],
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
      diagramRole: "GOLANG BACKEND & DATABASE ARCHITECT",
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
    { name: "Golang (Go)", category: "backend", description: "Ngôn ngữ lập trình biên dịch tốc độ cao từ Google, tối ưu xử lý đồng thời (goroutines) và vi dịch vụ backend chịu tải.", level: "Chuyên sâu" },
    { name: "FastAPI (Python)", category: "backend", description: "Khung phát triển Backend API Python bất đồng bộ (asyncio) tốc độ cao, hỗ trợ chuẩn OpenAPI và xử lý dữ liệu chuẩn Pydantic.", level: "Chuyên sâu" },
    { name: "Java", category: "backend", description: "Nền tảng backend doanh nghiệp bảo mật và hiệu năng ổn định.", level: "Chuyên sâu" },
    { name: "Prisma", category: "database", description: "Hệ thống ORM hiện đại, an toàn kiểu dữ liệu cho SQL.", level: "Cốt lõi" },
    { name: "Supabase", category: "database", description: "Nền tảng dịch vụ backend tích hợp sẵn cơ sở dữ liệu Postgres.", level: "Chuyên sâu" },
    { name: "Neon Database", category: "database", description: "Cơ sở dữ liệu PostgreSQL phi máy chủ hỗ trợ mở rộng nhanh.", level: "Chuyên sâu" },
    { name: "PostgreSQL", category: "database", description: "Hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, tin cậy cao.", level: "Cốt lõi" },
    { name: "Render", category: "devops", description: "Hạ tầng Cloud Hosting vận hành ứng dụng Web & Backend API.", level: "Chuyên sâu" },
    { name: "Cloudinary", category: "devops", description: "Nền tảng CDN tối ưu hóa và phân phối hình ảnh, video đám mây tự động.", level: "Chuyên sâu" },
    { name: "Coolify", category: "devops", description: "Nền tảng PaaS tự quản lý (Self-hosted) triển khai ứng dụng trên hạ tầng đám mây riêng.", level: "Chuyên sâu" },
    { name: "Netlify", category: "devops", description: "Hạ tầng Cloud Hosting tối ưu triển khai ứng dụng Frontend & Jamstack tốc độ cao.", level: "Cốt lõi" },
    { name: "Railway", category: "devops", description: "Nền tảng Cloud PaaS hiện đại giúp đóng gói & triển khai Web, Database tự động.", level: "Chuyên sâu" },
    { name: "Docker", category: "devops", description: "Môi trường đóng gói phần mềm nhất quán khi triển khai.", level: "Cốt lõi" },
    { name: "GitHub Actions", category: "devops", description: "Hệ thống tự động hóa quy trình kiểm thử và tích hợp CI/CD.", level: "Chuyên sâu" },
    { name: "DigitalOcean", category: "devops", description: "Hạ tầng Cloud VPS & Droplets toàn cầu tối ưu tốc độ và độ ổn định cao.", level: "Cốt lõi" },
    { name: "Vietnix", category: "devops", description: "Hạ tầng Cloud VPS cao cấp tại Việt Nam với đường truyền trong nước tốc độ cao & chống DDoS.", level: "Chuyên sâu" },
    { name: "Hostinger", category: "devops", description: "Nền tảng Cloud VPS & Hosting quốc tế tối ưu chi phí và triển khai nhanh chóng.", level: "Chuyên sâu" },
    { name: "Hetzner", category: "devops", description: "Hạ tầng Cloud VPS & Dedicated Server chuẩn Châu Âu với hiệu năng vượt trội và chi phí tối ưu cho các dự án quốc tế.", level: "Chuyên sâu" }
  ],
  en: [
    { name: "Next.js", category: "frontend", description: "Production framework for SSR and static rendering.", level: "Primary" },
    { name: "React.js", category: "frontend", description: "State driven declarative UI components.", level: "Core" },
    { name: "TypeScript", category: "frontend", description: "Static compile time type safety and contracts.", level: "Core" },
    { name: "NestJS", category: "backend", description: "Scalable enterprise Node.js server framework.", level: "Primary" },
    { name: "Golang (Go)", category: "backend", description: "High-performance compiled language by Google, optimized for high concurrency (goroutines) and microservices.", level: "Primary" },
    { name: "FastAPI (Python)", category: "backend", description: "High-performance async Python API framework powered by Starlette and Pydantic with automated OpenAPI docs.", level: "Primary" },
    { name: "Java", category: "backend", description: "Robust, secure, high performance enterprise backend.", level: "Primary" },
    { name: "Prisma", category: "database", description: "Modern, type safe ORM for relational queries.", level: "Core" },
    { name: "Supabase", category: "database", description: "Backend service integrated with Postgres.", level: "Primary" },
    { name: "Neon Database", category: "database", description: "Serverless Postgres database with instant scaling.", level: "Primary" },
    { name: "PostgreSQL", category: "database", description: "Powerful relational database with high data integrity.", level: "Core" },
    { name: "Render", category: "devops", description: "Cloud platform hosting web applications & API services.", level: "Primary" },
    { name: "Cloudinary", category: "devops", description: "Automated cloud media CDN for responsive image and video optimization.", level: "Primary" },
    { name: "Coolify", category: "devops", description: "Self-hosted PaaS alternative for deploying applications on private cloud servers.", level: "Primary" },
    { name: "Netlify", category: "devops", description: "High-performance cloud platform for Jamstack & Frontend web apps.", level: "Core" },
    { name: "Railway", category: "devops", description: "Modern cloud PaaS platform for instant deployment of web apps & databases.", level: "Primary" },
    { name: "Docker", category: "devops", description: "Containerized, predictable deployment parity.", level: "Core" },
    { name: "GitHub Actions", category: "devops", description: "Automated testing and CI/CD deployment workflows.", level: "Primary" },
    { name: "DigitalOcean", category: "devops", description: "Global Cloud VPS & Droplets infrastructure optimized for speed, reliability, and scale.", level: "Core" },
    { name: "Vietnix", category: "devops", description: "Premium Vietnamese Cloud VPS infrastructure with high-speed low-latency domestic bandwidth & DDoS protection.", level: "Primary" },
    { name: "Hostinger", category: "devops", description: "Cost-effective international Cloud VPS and hosting with rapid containerized deployments.", level: "Primary" },
    { name: "Hetzner", category: "devops", description: "High-performance European Cloud VPS & Dedicated Server infrastructure optimized for international deployments.", level: "Primary" }
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
      answer: "Three Bugs Studio cam kết 100% không phát sinh bất kỳ phụ phí ẩn nào ngoài hợp đồng! Báo giá được tính toán trọn gói dựa trên bảng đặc tả tính năng chi tiết (Scope of Work) được hai bên thống nhất từ đầu. Giá khởi điểm của từng gói được công khai ngay trên website, và chi phí thanh toán được chia theo từng mốc nghiệm thu (30% - 40% - 30%; gói Template 50% - 50%): bạn chỉ giải ngân giai đoạn tiếp theo khi đã kiểm tra và hoàn toàn hài lòng với kết quả giai đoạn trước. Nếu trong quá trình làm bạn muốn bổ sung tính năng mới ngoài thỏa thuận ban đầu, Studio sẽ báo giá độc lập minh bạch và chỉ triển khai khi có sự đồng ý của bạn.",
      keyBenefits: [
        "Báo giá trọn gói minh bạch, cam kết không phát sinh phụ phí bất ngờ",
        "Thanh toán linh hoạt chia theo từng cột mốc (Phase) nghiệm thu thực tế",
        "Chỉ thanh toán giai đoạn tiếp theo khi đã nghiệm thu ưng ý giai đoạn trước",
        "Ghi rõ những khoản không bao gồm (server, phí API AI, tên miền) ngay trong từng gói"
      ]
    },
    {
      question: "Chính sách bảo hành, sửa lỗi và duy trì hoạt động sau khi bàn giao diễn ra như thế nào?",
      badge: "BẢO HÀNH THEO GÓI",
      category: "warranty",
      answer: "Mọi sản phẩm đều được bảo hành lỗi kỹ thuật MIỄN PHÍ theo thời hạn của từng gói: Template 14 ngày, Landing & Web Giới Thiệu 1 tháng, Doanh Nghiệp & E-Commerce 3 tháng (khách doanh nghiệp 6 tháng), Web App & AI 3 tháng. Trong thời gian bảo hành, mọi lỗi phát sinh từ phần studio đã bàn giao đều được sửa miễn phí; tính năng mới không nằm trong bảo hành. Chúng tôi hỗ trợ trong giờ hành chính và phản hồi trong vòng 4 giờ làm việc. Hết bảo hành, bạn có thể dùng gói Bảo Trì Theo Giờ (từ 300.000đ/giờ) hoặc gói bảo trì hằng tháng cho Web App.",
      keyBenefits: [
        "Bảo hành lỗi miễn phí: 14 ngày đến 6 tháng tùy gói, ghi rõ trong từng gói",
        "Hỗ trợ giờ hành chính, phản hồi trong 4 giờ làm việc",
        "Gói Doanh Nghiệp & Web App có sao lưu dữ liệu tự động hằng ngày",
        "Hết bảo hành: bảo trì theo giờ từ 300.000đ/giờ, không bắt buộc phí hằng tháng"
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
      answer: "Chúng tôi cam kết tiến độ rõ ràng bằng văn bản: Template 2–3 ngày làm việc, Landing & Web Giới Thiệu 1–2 tuần, Doanh Nghiệp & E-Commerce 3–6 tuần, Web App & AI bản MVP 6–10 tuần. Trong suốt quá trình phát triển, bạn sẽ được cung cấp đường link Live Staging/Demo riêng biệt để trực tiếp truy cập trên điện thoại và máy tính, theo dõi từng màn hình được hoàn thiện mỗi tuần. Hợp đồng ghi rõ mốc thời gian: nếu trễ hạn do lỗi từ Studio, chúng tôi gia hạn thêm thời gian bảo hành miễn phí tương ứng.",
      keyBenefits: [
        "Tiến độ theo gói: 2–3 ngày (Template) đến 6–10 tuần (Web App MVP)",
        "Cung cấp link Staging/Demo kiểm thử trực tiếp trên điện thoại & máy tính hàng tuần",
        "Cam kết điều khoản tiến độ rõ ràng trong hợp đồng pháp lý",
        "Gia hạn bảo hành miễn phí nếu trễ hạn do lỗi Studio"
      ]
    },
    {
      question: "Website bàn giao có đảm bảo chuẩn SEO Google và đạt điểm tốc độ cao trên di động không?",
      badge: "CHUẨN SEO & PAGESPEED 95-100",
      category: "quality",
      answer: "Chắc chắn có! Mọi sản phẩm xuất xưởng từ Three Bugs Studio đều được kiểm thử và tối ưu đạt điểm Google PageSpeed Insights & Lighthouse Xanh (95 – 100), điển hình như dự án thực tế H1T MICRO đạt 99 Performance, 100 SEO, 100 Accessibility và 100 Best Practices. Chúng tôi tích hợp sẵn hạ tầng SEO On-Page chuẩn chỉnh: thẻ Open Graph chia sẻ mạng xã hội, dữ liệu có cấu trúc Schema JSON-LD, Sitemap.xml tự động, và cấu trúc Semantic HTML5 tải trang dưới 1.5 giây. Điều này giúp website của bạn nhanh chóng được Google xếp hạng cao, tối ưu tỷ lệ chuyển đổi khách hàng và tiết kiệm hàng chục triệu chi phí quảng cáo.",
      keyBenefits: [
        "Tối ưu điểm Google PageSpeed & Lighthouse Xanh (95-100) cả Desktop & Mobile (minh chứng: H1T MICRO đạt 99-100 điểm)",
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
    },
    {
      question: "Three Bugs Studio có nhận các dự án phần mềm từ khách hàng hoặc doanh nghiệp ở nước ngoài không?",
      badge: "DỰ ÁN QUỐC TẾ // GLOBAL",
      category: "ownership",
      answer: "Có, hoàn toàn sẵn sàng! Three Bugs Studio vận hành theo mô hình 100% Remote-First, có khả năng giao tiếp và làm việc trực tiếp bằng Tiếng Anh chuyên ngành phần mềm. Chúng tôi linh hoạt điều chỉnh múi giờ họp và cập nhật tiến độ theo giờ quốc tế (Hoa Kỳ, Châu Âu, Úc, Singapore, Nhật Bản,...). Về mặt hạ tầng, Studio tự chủ triển khai máy chủ toàn cầu trên Hetzner (Châu Âu/Mỹ), DigitalOcean, AWS kết hợp CDN Cloudflare và Cloudinary tối ưu độ trễ. Chúng tôi hỗ trợ thanh toán quốc tế bằng USD qua điện chuyển tiền quốc tế (Wire Transfer), Stripe, Wise hoặc PayPal với hợp đồng dịch vụ rõ ràng.",
      keyBenefits: [
        "100% Remote-First, trao đổi và đặc tả kỹ thuật trực tiếp bằng Tiếng Anh",
        "Linh hoạt đồng bộ múi giờ làm việc theo yêu cầu khách hàng quốc tế",
        "Hạ tầng VPS & Dedicated Server toàn cầu: Hetzner (Châu Âu/Mỹ), DigitalOcean, AWS",
        "Hỗ trợ thanh toán quốc tế đa kênh bằng USD (Wire Transfer, Stripe, Wise, PayPal)"
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
      answer: "Three Bugs Studio strictly guarantees zero unexpected hidden fees! Every project quote is fixed-scope based on an itemized Scope of Work mutually agreed upon before kickoff. Starting prices for every package are published on this site, and payments follow clear milestones (30% - 40% - 30%; 50% - 50% for templates): you only disburse funds for the next phase once you have inspected and fully approved the deliverables of the previous phase. Should you wish to expand functionality, we provide clear separate estimates and proceed only upon your consent.",
      keyBenefits: [
        "Transparent fixed-scope quotes with zero unexpected surcharges",
        "Flexible milestone payments across verified delivery phases",
        "Next milestone payment released only upon your explicit satisfaction",
        "Every package lists what is not included (servers, AI API fees, domains)"
      ]
    },
    {
      question: "What is your warranty policy, bug-fixing coverage, and post-launch maintenance SLA?",
      badge: "WARRANTY PER PACKAGE",
      category: "warranty",
      answer: "Every delivery includes a FREE technical warranty for the period of its package: Template 14 days, Landing & Company Site 1 month, Business & E-Commerce 3 months (6 months for enterprise clients), Web App & AI 3 months. During the warranty, bugs in what we delivered are fixed at no cost; new features are not covered. We support you during business hours and respond within 4 working hours. After the warranty you can use Hourly Maintenance (from 300k VND/hour) or a monthly maintenance plan for web apps.",
      keyBenefits: [
        "Free bug-fix warranty from 14 days to 6 months, stated in each package",
        "Business-hours support with a 4-working-hour response",
        "Automatic daily backups on Business & Web App packages",
        "After warranty: hourly maintenance from 300k VND/hour, no monthly lock-in"
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
      answer: "We guarantee delivery timelines in formal contracts: Template 2–3 working days, Landing & Company Site 1–2 weeks, Business & E-Commerce 3–6 weeks, Web App & AI MVP 6–10 weeks. Throughout development, you receive access to a dedicated Live Staging/Demo link to test newly shipped screens every week directly on your mobile device and desktop. Contracts state clear milestones: if we are late through our own fault, we extend your free warranty by the same amount.",
      keyBenefits: [
        "Timelines per package: 2–3 days (Template) to 6–10 weeks (Web App MVP)",
        "Live weekly staging links accessible on mobile and desktop devices",
        "Legally committed delivery milestones in binding contracts",
        "Free warranty extension if we miss a deadline through our fault"
      ]
    },
    {
      question: "Does the delivered website meet Google SEO standards and high mobile performance scores?",
      badge: "SEO & 95-100 SPEED BUILT-IN",
      category: "quality",
      answer: "Absolutely! Every project shipped by Three Bugs Studio is audited and optimized to achieve Green Google PageSpeed Insights and Lighthouse ratings (95 – 100), as proven by our live production benchmark on H1T MICRO scoring 99 Performance, 100 SEO, 100 Accessibility, and 100 Best Practices. We build in comprehensive On-Page SEO: Open Graph social previews, Schema JSON-LD structured data, automated XML sitemaps, and semantic HTML5 with sub-1.5 second page load speeds. This boosts Google rankings, maximizes conversion rates, and saves thousands of dollars in ad spend.",
      keyBenefits: [
        "Green Google PageSpeed & Lighthouse scores (95–100) on Desktop & Mobile (proven by H1T MICRO's 99-100 ratings)",
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
    },
    {
      question: "Does Three Bugs Studio accept software projects from international or overseas clients?",
      badge: "GLOBAL & OVERSEAS",
      category: "ownership",
      answer: "Yes, absolutely! Three Bugs Studio is built as a 100% remote-first engineering team, fully fluent in professional English for technical specifications and project management. We accommodate international timezones (US, Europe, Australia, Singapore, Japan, etc.) with flexible meeting syncs and async updates. Infrastructure-wise, we deploy global low-latency servers on Hetzner (European/US data centers), DigitalOcean, and AWS, combined with Cloudflare and Cloudinary CDN networks. For international billing, we support USD transactions via International Wire Transfer, Stripe, Wise, or PayPal under clear international service agreements.",
      keyBenefits: [
        "100% remote-first engineering with fluent English technical communication",
        "Flexible working hour alignment across international timezones (US, EU, APAC)",
        "Global high-performance cloud infrastructure: Hetzner, DigitalOcean, and AWS",
        "Multi-channel USD billing support (International Wire Transfer, Stripe, Wise, PayPal)"
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
    heroDesc: "Three Bugs Studio là đội ngũ gồm 5 thành viên lập trình viên & thiết kế chuyên nghiệp làm việc từ xa (100% Remote-First), sẵn sàng tiếp nhận các dự án trong nước lẫn quốc tế, chuyên xây dựng website chất lượng cao, vận hành ổn định và tối ưu hiệu năng.",
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
    techSubtitle: "Những ngôn ngữ & công nghệ hiện đại (Next.js, TypeScript, Golang, FastAPI / Python, NestJS, Hetzner, Vietnix) giúp trang web tải nhanh, chịu tải tốt và dễ dàng nâng cấp.",
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
    contactSubtitle: "Hãy để lại thông tin liên hệ và ý tưởng của bạn. Đội ngũ kỹ sư của chúng tôi tiếp nhận các dự án trong nước & quốc tế, sẽ liên hệ lại trong vòng 12 giờ làm việc để tư vấn cụ thể.",
    contactFieldName: "Họ và tên",
    contactFieldEmail: "Địa chỉ email",
    contactFieldCompany: "Tên cửa hàng hoặc công ty",
    contactFieldServices: "Dịch vụ cần tư vấn",
    contactFieldBudget: "Gói cước / Ngân sách lựa chọn",
    contactFieldMessage: "Chi tiết yêu cầu của bạn",
    contactBudgetValue: "Từ 2,5 triệu",
    contactBudgetRange1: "Gói 1: Landing & Web Giới Thiệu (Từ 8 triệu)",
    contactBudgetRange2: "Gói 2: Doanh Nghiệp & E-Commerce (Từ 25 triệu)",
    contactBudgetRange3: "Gói 3: Web App & Hệ Thống AI (Từ 150 triệu)",
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
    heroDesc: "Three Bugs Studio is a 100% remote-first team of 5 specialized developers & designers partnering with domestic and global clients to craft clean, fast, and durable digital products.",
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
    techSubtitle: "Modern programming languages & cloud stacks (Next.js, TypeScript, Golang, FastAPI / Python, NestJS, Hetzner, Vietnix) engineered for high concurrency, durability, and performance.",
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
    contactSubtitle: "Tell us about your technical requirements. We build for clients locally and worldwide, reviewing specifications and responding within 12 business hours.",
    contactFieldName: "Full Name",
    contactFieldEmail: "Email Address",
    contactFieldCompany: "Company or Venture",
    contactFieldServices: "Service of Interest",
    contactFieldBudget: "Selected Package / Budget",
    contactFieldMessage: "Project Requirements",
    contactBudgetValue: "From 2.5M VND",
    contactBudgetRange1: "Package 1: Landing & Company Site (From 8M VND)",
    contactBudgetRange2: "Package 2: Business & E-Commerce (From 25M VND)",
    contactBudgetRange3: "Package 3: Web App & AI Systems (From 150M VND)",
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
