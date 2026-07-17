import { Project, Service, ProcessStep, Value, TeamMember, TechItem, Testimonial, FAQItem } from "./types";

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
      outcome: "Bàn giao cửa hàng trực tuyến chạy mượt mượt mà, đạt điểm tối ưu hóa SEO 98%, bàn giao đầy đủ mã nguồn và cam kết bảo hành lâu dài.",
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
      liveUrl: "https://github.com/DongDuong2001/pudo-code-system"
    },
    {
      id: "fortify_kitchen",
      title: "Fortify Kitchen",
      client: "Fortify Kitchen",
      category: "Ẩm thực Sous-Vide & Hệ thống Đặt món",
      shortStory: "Hệ thống website giới thiệu thực đơn dinh dưỡng nấu chậm Sous-Vide giao tại khu vực TP.HCM. Dự án có sự tham gia lập trình và thiết kế của cả 5 thành viên Duong Phu Dong, Thu Tran, Ho Huy, Huynh Quang Dong và Hao Vu.",
      technologies: ["Next.js", "React", "PostgreSQL", "TailwindCSS", "Vercel"],
      timeline: "Đang duy trì & Hotfix",
      outcome: "Bàn giao giao diện tối giản giới thiệu thực đơn ăn uống khoa học, tích hợp biểu đồ lượng calo và hiện đang duy trì vận hành ổn định.",
      coverImage: "fortifykitchen",
      metrics: "Giao tại TP.HCM & Đang Bảo trì",
      liveUrl: "https://fortifykitchen.vercel.app/"
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
      liveUrl: "https://github.com/DongDuong2001/pudo-code-system"
    },
    {
      id: "fortify_kitchen",
      title: "Fortify Kitchen",
      client: "Fortify Kitchen",
      category: "Sous-Vide Culinary & Ordering System",
      shortStory: "A web platform presenting slow-cooked (Sous-Vide) nutritional meal plans with local delivery in Ho Chi Minh City. Built collaboratively by Duong Phu Dong, Thu Tran, Ho Huy, Huynh Quang Dong, and Hao Vu.",
      technologies: ["Next.js", "React", "PostgreSQL", "TailwindCSS", "Vercel"],
      timeline: "Active Maintenance & Hotfix",
      outcome: "Launched the interface for healthy menu listings and calorie calculations. Currently in continuous maintenance and hotfix support.",
      coverImage: "fortifykitchen",
      metrics: "Saigon Delivery & Maintenance",
      liveUrl: "https://fortifykitchen.vercel.app/"
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
      description: "Chúng tôi tập trung viết mã nguồn sạch và thiết kế cơ sở dữ liệu ngăn nắp. Điều này giúp trang web của bạn chạy mượt mà và dễ dàng nâng cấp các chức năng mới về sau."
    },
    {
      id: "craft",
      title: "Giao Diện tối giản",
      subtitle: "Thẩm mỹ hiện đại và trực quan",
      description: "Giao diện được thiết kế đơn giản, gọn gàng và dễ nhìn. Chúng tôi chăm chút các khoảng trống, cỡ chữ và hiệu ứng chuyển động nhẹ nhàng để khách mua hàng có trải nghiệm tối ưu.",
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

export const TEAM_DATA: Record<"vi" | "en", TeamMember[]> = {
  vi: [
    {
      name: "Duong Phu Dong",
      role: "Founder của studio",
      bio: "Chuyên gia quản trị dự án phần mềm với tầm nhìn thực tế. Anh đảm nhận trách nhiệm quản lý tổng thể, thiết lập đặc tả dự án và đảm bảo bàn giao đúng chất lượng.",
      specialties: ["Quản lý Dự án", "Đặc tả Phần mềm", "Phân tích Nghiệp vụ", "Đảm bảo Cam kết"],
      socials: {
        github: "https://github.com/DongDuong2001"
      }
    },
    {
      name: "Thu Tran",
      role: "Co-Founder & Thiết kế Website",
      bio: "Chuyên gia thiết kế giao diện sáng tạo với tư duy thẩm mỹ hiện đại. Cô tập trung vào việc tạo nên các giao diện người dùng tối giản, tinh tế và tối ưu hóa trải nghiệm.",
      specialties: ["Thiết kế UI/UX", "Ý tưởng Thiết kế", "Hệ thống Thiết kế", "Tương tác Giao diện"],
      socials: {
        github: "https://github.com/mthutt"
      }
    },
    {
      name: "Huynh Quang Dong",
      role: "Tester và Scrum Master",
      bio: "Chuyên gia kiểm định chất lượng và điều phối quy trình phát triển. Anh chịu trách nhiệm kiểm thử hệ thống, thúc đẩy quy trình Agile linh hoạt và đảm bảo bàn giao sản phẩm đạt chuẩn chất lượng.",
      specialties: ["Kiểm thử Phần mềm", "Scrum Master", "Quy trình Agile", "Đảm bảo Chất lượng"],
      socials: {
        github: "https://github.com/quangdong26"
      }
    },
    {
      name: "Ho Quang Huy",
      role: "DevOps và Nhà phát triển Full Stack",
      bio: "Kỹ sư vận hành đám mây và lập trình viên toàn diện. Anh phụ trách tối ưu hóa máy chủ, thiết lập môi trường Docker và xây dựng các hệ thống backend chạy mượt mà.",
      specialties: ["Kiến trúc DevOps", "Docker và Vận hành", "Lập trình Full Stack", "Cơ sở dữ liệu PostgreSQL"],
      socials: {
        github: "https://github.com/HoHuy2402"
      }
    },
    {
      name: "Hao Vu",
      role: "Lập trình viên Backend & Cơ sở dữ liệu",
      bio: "Kỹ sư hệ thống máy chủ và tối ưu hóa dữ liệu. Anh tập trung xây dựng cơ sở hạ tầng backend bảo mật, thiết kế cấu trúc CSDL hiệu năng và tích hợp hệ thống API.",
      specialties: ["Lập trình Backend", "Thiết kế API", "Tối ưu hóa CSDL", "Bảo mật Hệ thống"],
      socials: {
        github: "https://github.com/haovu310"
      }
    }
  ],
  en: [
    {
      name: "Duong Phu Dong",
      role: "Founder of the studio",
      bio: "Software project manager with a realistic and structured vision. He oversees end to end execution, locks down requirements, and ensures timely delivery.",
      specialties: ["Project Management", "Software Specs", "Business Analysis", "Client Delivery"],
      socials: {
        github: "https://github.com/DongDuong2001"
      }
    },
    {
      name: "Thu Tran",
      role: "Co-Founder & Website Designer",
      bio: "Creative interface designer with a modern aesthetic vision. She focuses on crafting clean, minimalist user layouts and user experience flows.",
      specialties: ["UI/UX Design", "Design Concepting", "Design Systems", "Interactive Layouts"],
      socials: {
        github: "https://github.com/mthutt"
      }
    },
    {
      name: "Huynh Quang Dong",
      role: "Tester and Scrum Master",
      bio: "Quality assurance expert and agile coordinator. He leads quality verification, drives agile execution, and ensures top-tier software delivery.",
      specialties: ["Quality Assurance", "Scrum Master", "Agile Framework", "Software Testing"],
      socials: {
        github: "https://github.com/quangdong26"
      }
    },
    {
      name: "Ho Quang Huy",
      role: "DevOps and Full Stack Developer",
      bio: "Cloud infrastructure architect and full stack engineer. He configures Docker networks, automates deployment flows, and builds reliable backend API services.",
      specialties: ["DevOps and Pipelines", "Docker and Cloud Setup", "Full Stack Development", "PostgreSQL Database"],
      socials: {
        github: "https://github.com/HoHuy2402"
      }
    },
    {
      name: "Hao Vu",
      role: "Backend & Database Developer",
      bio: "Server-side system architect and database optimizer. He is responsible for building secure backend infrastructures, database schema design, and API integration.",
      specialties: ["Backend Engineering", "API System Design", "Database Tuning", "System Security"],
      socials: {
        github: "https://github.com/haovu310"
      }
    }
  ]
};

export const TECH_DATA: Record<"vi" | "en", TechItem[]> = {
  vi: [
    { name: "Next.js", category: "frontend", description: "Khung phát triển hỗ trợ SSR và kết xuất tĩnh.", level: "Chuyên sâu" },
    { name: "React.js", category: "frontend", description: "Giao diện người dùng hướng trạng thái và mo đun hóa.", level: "Cốt lõi" },
    { name: "TypeScript", category: "frontend", description: "Đảm bảo an toàn kiểu dữ liệu ở mức biên dịch.", level: "Cốt lõi" },
    { name: "Java", category: "backend", description: "Nền tảng backend doanh nghiệp bảo mật và hiệu năng ổn định.", level: "Chuyên sâu" },
    { name: "Prisma", category: "database", description: "Hệ thống ORM hiện đại, an toàn kiểu dữ liệu cho SQL.", level: "Cốt lõi" },
    { name: "Supabase", category: "database", description: "Nền tảng dịch vụ backend tích hợp sẵn cơ sở dữ liệu Postgres.", level: "Chuyên sâu" },
    { name: "Neon Database", category: "database", description: "Cơ sở dữ liệu PostgreSQL phi máy chủ hỗ trợ mở rộng nhanh.", level: "Chuyên sâu" },
    { name: "PostgreSQL", category: "database", description: "Hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, tin cậy cao.", level: "Cốt lõi" },
    { name: "Docker", category: "devops", description: "Môi trường đóng gói phần mềm nhất quán khi triển khai.", level: "Cốt lõi" }
  ],
  en: [
    { name: "Next.js", category: "frontend", description: "Production framework for SSR and static rendering.", level: "Primary" },
    { name: "React.js", category: "frontend", description: "State driven declarative UI components.", level: "Core" },
    { name: "TypeScript", category: "frontend", description: "Static compile time type safety and contracts.", level: "Core" },
    { name: "Java", category: "backend", description: "Robust, secure, high performance enterprise backend.", level: "Primary" },
    { name: "Prisma", category: "database", description: "Modern, type safe ORM for relational queries.", level: "Core" },
    { name: "Supabase", category: "database", description: "Backend service integrated with Postgres.", level: "Primary" },
    { name: "Neon Database", category: "database", description: "Serverless Postgres database with instant scaling.", level: "Primary" },
    { name: "PostgreSQL", category: "database", description: "Powerful relational database with high data integrity.", level: "Core" },
    { name: "Docker", category: "devops", description: "Containerized, predictable deployment parity.", level: "Core" }
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
      question: "Chi phí thiết kế và hoàn thiện website được tính như thế nào?",
      answer: "Chúng tôi áp dụng mức giá cố định rõ ràng. Gói website cơ bản có chi phí từ 8 đến 10 triệu VND. Gói website tích hợp đầy đủ chức năng nâng cao có chi phí từ 15 đến 20 triệu VND. Đối với các dự án xây dựng ứng dụng di động phức tạp hơn, chi tiết ngân sách sẽ được hai bên bàn bạc cụ thể và thương lượng trực tiếp qua email hoặc Zalo."
    },
    {
      question: "Thời gian hoàn thành một dự án thường kéo dài trong bao lâu?",
      answer: "Với các dự án website giới thiệu cửa hàng hoặc thương mại điện tử như Sukajan Store, thời gian bàn giao tối ưu là trong vòng 3 tuần. Đối với các hệ thống phức tạp hơn cần phân tích nhiều chức năng, thời gian thực hiện có thể dao động từ 4 đến 8 tuần. Chúng tôi cam kết lộ trình rõ ràng và cập nhật tiến độ liên tục hàng tuần cho bạn."
    },
    {
      question: "Quy trình làm việc và bàn giao sản phẩm diễn ra ra sao?",
      answer: "Chúng tôi làm việc theo 5 bước từ khâu nhận yêu cầu, thiết kế giao diện Figma, viết mã nguồn, kiểm thử hệ thống đến khi đưa trang web hoạt động chính thức. Khi dự án hoàn thành, chúng tôi bàn giao toàn bộ mã nguồn sạch, tài liệu hướng dẫn vận hành đi kèm chính sách hỗ trợ kỹ thuật và bảo hành lâu dài."
    }
  ],
  en: [
    {
      question: "How is the project pricing calculated?",
      answer: "We offer flat and transparent pricing. A basic website starts from 8 to 10 million VND. A full featured website ranges from 15 to 20 million VND. For complex custom application builds, the budget and technical scopes are negotiated directly via email or Zalo."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "Standard online stores such as the Sukajan Store are built and launched in 3 weeks. For more complex projects, development usually takes 4 to 8 weeks. We lock down a clear timeline during our initial discovery step and update you with demo progress every week."
    },
    {
      question: "What is the development and delivery process?",
      answer: "Our workflow covers 5 clear stages: discovery, UI UX design, backend and frontend development, cloud deployment, and long term support. Upon launch, we hand over full source code ownership, complete documentation, and professional technical warranty."
    }
  ]
};

export const TRANSLATIONS = {
  vi: {
    navWork: "Dự Án",
    navServices: "Dịch Vụ",
    navProcess: "Quy Trình",
    navStudio: "Công Nghệ",
    navTeam: "Đội Ngũ",
    navTestimonials: "Đánh Giá",
    navFaq: "Hỏi Đáp",
    navStartProject: "Khởi Đầu Dự Án",
    navInquiries: "Liên Hệ",

    heroTag: "THIẾT KẾ VÀ PHÁT TRIỂN WEBSITE CHUYÊN NGHIỆP",
    heroHeading: "Chúng Tôi Xây Dựng Website và Phần Mềm",
    heroDesc: "Three Bugs Studio, đội ngũ gồm ba lập trình viên hoạt động hoàn toàn theo mô hình làm việc từ xa (100% Remote), chuyên xây dựng website chất lượng cao, vận hành ổn định và tối ưu hiệu năng.",
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

    faqLabel: "09 // THẮC MẮC THƯỜNG GẶP",
    faqHeading: "Giải đáp các câu hỏi thường gặp.",

    contactLabel: "08 // LIÊN HỆ HỢP TÁC",
    contactHeading: "Gửi yêu cầu thiết kế trang web của bạn.",
    contactSubtitle: "Hãy để lại thông tin liên hệ và ý tưởng của bạn. Đội ngũ lập trình viên của chúng tôi sẽ liên hệ lại trong vòng 12 giờ làm việc để tư vấn cụ thể.",
    contactFieldName: "Họ và tên",
    contactFieldEmail: "Địa chỉ email",
    contactFieldCompany: "Tên cửa hàng hoặc công ty",
    contactFieldServices: "Dịch vụ cần tư vấn",
    contactFieldBudget: "Ngân sách dự kiến",
    contactFieldMessage: "Chi tiết yêu cầu của bạn",
    contactBudgetValue: "VND",
    contactBudgetRange1: "Từ 8 đến 10 triệu VND (Website cơ bản)",
    contactBudgetRange2: "Từ 15 đến 20 triệu VND (Website đầy đủ chức năng)",
    contactBudgetRange3: "Thương lượng qua email hoặc Zalo (Dự án App)",
    contactBudgetConversionLabel: "Tỷ giá quy đổi tham khảo: 1 USD bằng khoảng 26,299.87 VND",
    contactSendBtn: "GỬI THÔNG TIN YÊU CẦU",
    contactSendingBtn: "ĐANG GỬI THÔNG TIN...",
    contactSuccessTitle: "Gửi thông tin thành công!",
    contactSuccessMessage: "Cảm ơn bạn đã liên hệ. Yêu cầu của bạn đã được gửi trực tiếp đến dongduong840@gmail.com. Chúng tôi sẽ phản hồi sớm để trao đổi chi tiết về giao diện và lộ trình thực hiện.",
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
    navStudio: "Tech Stack",
    navTeam: "Our Team",
    navTestimonials: "Reviews",
    navFaq: "FAQ",
    navStartProject: "Start Project",
    navInquiries: "Inquiries",

    heroTag: "SOFTWARE DESIGN AND ENGINEERING",
    heroHeading: "We build stable and fast web applications.",
    heroDesc: "Three Bugs Studio is a 100% remote-first team of three developers crafting clean, fast, and durable websites.",
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

    faqLabel: "09 // FREQUENTLY ASKED QUESTIONS",
    faqHeading: "Common questions with clear and direct answers.",

    contactLabel: "08 // THE BLUEPRINT FLOW",
    contactHeading: "Initiate your next product blueprint.",
    contactSubtitle: "Tell us about your technical requirements. Our developers based in Ho Chi Minh City will review and reach out within 12 business hours.",
    contactFieldName: "Full Name",
    contactFieldEmail: "Email Address",
    contactFieldCompany: "Company or Venture",
    contactFieldServices: "Service of Interest",
    contactFieldBudget: "Estimated Budget",
    contactFieldMessage: "Project Requirements",
    contactBudgetValue: "VND",
    contactBudgetRange1: "8 to 10 million VND (Basic Website)",
    contactBudgetRange2: "15 to 20 million VND (Full Features Website)",
    contactBudgetRange3: "Negotiated via email or Zalo (App Build)",
    contactBudgetConversionLabel: "Exchange rate estimation: 1 USD equals about 26,299.87 VND",
    contactSendBtn: "SEND PROJECT INQUIRY",
    contactSendingBtn: "TRANSMITTING INQUIRY...",
    contactSuccessTitle: "Inquiry Successfully Transmitted!",
    contactSuccessMessage: "Thank you for reaching out. Your inquiry has been transmitted directly to dongduong840@gmail.com. We will analyze your specifications and follow up shortly.",
    contactFormError: "Please complete all mandatory fields to proceed.",

    footerSiteIndex: "SITE INDEX",
    footerConnectivity: "CONNECTIVITY",
    footerSlogan: "Building digital products with unyielding structural foundations.",
    footerClock: "ENGINE SYSTEM CLOCK: ",
    footerBackToTop: "BACK TO TOP",
    footerCopyright: "THREE BUGS STUDIO © 2026. ALL RIGHTS RESERVED."
  }
};
