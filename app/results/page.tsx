"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Share2, Award, School, Briefcase, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

// Mô tả các kiểu tính cách MBTI
const personalityTypes = {
  // Các kiểu Phân tích (Analysts)
  INTJ: {
    title: "Kiến Trúc Sư (Architect)",
    description:
      "Nhà tư duy chiến lược với kế hoạch cho mọi thứ. Bạn là người có tầm nhìn xa, độc lập và luôn tìm cách cải thiện mọi thứ.",
    strengths: ["Tư duy chiến lược", "Độc lập", "Quyết đoán", "Tự tin", "Tư duy phân tích"],
    careers: [
      {
        title: "Kiến trúc sư phần mềm",
        description: "Thiết kế và phát triển các hệ thống phần mềm phức tạp.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Công nghệ - ĐHQGHN", "Đại học FPT"],
      },
      {
        title: "Nhà khoa học dữ liệu",
        description: "Phân tích dữ liệu phức tạp để tìm ra các mẫu và xu hướng.",
        schools: ["Đại học Khoa học Tự nhiên - ĐHQGHN", "Đại học Bách Khoa Hà Nội", "Đại học Công nghệ - ĐHQGHN"],
      },
      {
        title: "Nhà chiến lược kinh doanh",
        description: "Phát triển kế hoạch dài hạn để đạt được mục tiêu kinh doanh.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học Kinh tế TP.HCM"],
      },
      {
        title: "Nhà nghiên cứu",
        description: "Tiến hành nghiên cứu chuyên sâu trong lĩnh vực chuyên môn.",
        schools: [
          "Đại học Khoa học Tự nhiên - ĐHQGHN",
          "Đại học Bách Khoa Hà Nội",
          "Viện Hàn lâm Khoa học và Công nghệ Việt Nam",
        ],
      },
    ],
  },
  INTP: {
    title: "Nhà Lý Luận (Logician)",
    description:
      "Nhà sáng tạo đổi mới với niềm đam mê không ngừng đối với kiến thức. Bạn là người tò mò, sáng tạo và luôn tìm kiếm sự thật.",
    strengths: ["Tư duy phân tích", "Sáng tạo", "Tư duy độc lập", "Tò mò", "Khả năng giải quyết vấn đề phức tạp"],
    careers: [
      {
        title: "Lập trình viên",
        description: "Phát triển phần mềm và giải quyết các vấn đề kỹ thuật phức tạp.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Công nghệ - ĐHQGHN", "Đại học FPT"],
      },
      {
        title: "Nhà nghiên cứu khoa học",
        description: "Tiến hành nghiên cứu trong các lĩnh vực khoa học cơ bản hoặc ứng dụng.",
        schools: [
          "Đại học Khoa học Tự nhiên - ĐHQGHN",
          "Đại học Bách Khoa Hà Nội",
          "Viện Hàn lâm Khoa học và Công nghệ Việt Nam",
        ],
      },
      {
        title: "Kỹ sư AI",
        description: "Phát triển các giải pháp trí tuệ nhân tạo và học máy.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Công nghệ - ĐHQGHN", "Đại học FPT"],
      },
      {
        title: "Triết gia/Nhà tư tưởng",
        description: "Nghiên cứu và phát triển các lý thuyết triết học.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Học viện Chính trị Quốc gia Hồ Chí Minh"],
      },
    ],
  },
  ENTJ: {
    title: "Chỉ Huy (Commander)",
    description:
      "Nhà lãnh đạo táo bạo, giàu trí tưởng tượng và ý chí mạnh mẽ. Bạn là người quyết đoán, tự tin và có khả năng lãnh đạo tự nhiên.",
    strengths: ["Lãnh đạo", "Quyết đoán", "Tự tin", "Tư duy chiến lược", "Hiệu quả"],
    careers: [
      {
        title: "Giám đốc điều hành (CEO)",
        description: "Lãnh đạo và định hướng chiến lược cho tổ chức.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học Kinh tế TP.HCM"],
      },
      {
        title: "Quản lý dự án",
        description: "Lập kế hoạch, thực hiện và giám sát các dự án phức tạp.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Kinh tế Quốc dân", "Đại học FPT"],
      },
      {
        title: "Luật sư doanh nghiệp",
        description: "Tư vấn pháp lý cho doanh nghiệp và giải quyết các vấn đề pháp lý phức tạp.",
        schools: ["Đại học Luật Hà Nội", "Đại học Luật TP.HCM", "Học viện Tư pháp"],
      },
      {
        title: "Nhà tư vấn chiến lược",
        description: "Tư vấn cho các tổ chức về chiến lược kinh doanh và phát triển.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học Kinh tế TP.HCM"],
      },
    ],
  },
  ENTP: {
    title: "Người Tranh Luận (Debater)",
    description:
      "Nhà tư tưởng thông minh và tò mò, không thể cưỡng lại được một thách thức trí tuệ. Bạn là người sáng tạo, nhanh trí và thích thách thức các quy tắc.",
    strengths: ["Sáng tạo", "Khả năng tranh luận", "Tư duy nhanh", "Thích nghi", "Giải quyết vấn đề"],
    careers: [
      {
        title: "Doanh nhân",
        description: "Khởi nghiệp và phát triển các ý tưởng kinh doanh mới.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học FPT"],
      },
      {
        title: "Luật sư",
        description: "Đại diện cho khách hàng trong các vụ kiện và tranh chấp pháp lý.",
        schools: ["Đại học Luật Hà Nội", "Đại học Luật TP.HCM", "Học viện Tư pháp"],
      },
      {
        title: "Nhà phát triển sản phẩm",
        description: "Phát triển và cải tiến sản phẩm dựa trên nhu cầu thị trường.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Kinh tế Quốc dân", "Đại học FPT"],
      },
      {
        title: "Nhà báo/Phóng viên điều tra",
        description: "Điều tra và báo cáo về các vấn đề phức tạp.",
        schools: ["Học viện Báo chí và Tuyên truyền", "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN"],
      },
    ],
  },

  // Các kiểu Ngoại giao (Diplomats)
  INFJ: {
    title: "Người Ủng Hộ (Advocate)",
    description:
      "Nhà tư tưởng yên tĩnh và thần bí với một kế hoạch không ngờ để thay đổi thế giới. Bạn là người có tầm nhìn, nguyên tắc và luôn tìm cách giúp đỡ người khác.",
    strengths: ["Sáng tạo", "Thấu hiểu", "Quyết đoán", "Có nguyên tắc", "Đáng tin cậy"],
    careers: [
      {
        title: "Nhà tâm lý học",
        description: "Giúp đỡ mọi người giải quyết các vấn đề tâm lý và cảm xúc.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Đại học Sư phạm Hà Nội", "Đại học Y Hà Nội"],
      },
      {
        title: "Nhà tư vấn",
        description: "Tư vấn và hướng dẫn cá nhân hoặc tổ chức phát triển.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Đại học Kinh tế Quốc dân"],
      },
      {
        title: "Nhà văn/Biên kịch",
        description: "Sáng tạo nội dung có ý nghĩa và sâu sắc.",
        schools: [
          "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN",
          "Đại học Sân khấu Điện ảnh Hà Nội",
          "Học viện Báo chí và Tuyên truyền",
        ],
      },
      {
        title: "Nhà hoạt động xã hội",
        description: "Vận động và thúc đẩy các thay đổi xã hội tích cực.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Học viện Chính trị Quốc gia Hồ Chí Minh"],
      },
    ],
  },
  INFP: {
    title: "Người Hòa Giải (Mediator)",
    description:
      "Nhà thơ, người nhân ái và lý tưởng, luôn sẵn sàng giúp đỡ một sự nghiệp tốt. Bạn là người có lý tưởng, sáng tạo và luôn tìm kiếm ý nghĩa trong cuộc sống.",
    strengths: ["Sáng tạo", "Đồng cảm", "Lý tưởng", "Trung thành", "Thấu hiểu"],
    careers: [
      {
        title: "Nhà văn/Nhà thơ",
        description: "Sáng tạo các tác phẩm văn học có ý nghĩa và cảm xúc.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Học viện Báo chí và Tuyên truyền"],
      },
      {
        title: "Nhà tâm lý học tư vấn",
        description: "Giúp đỡ mọi người vượt qua khó khăn và phát triển bản thân.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Đại học Sư phạm Hà Nội"],
      },
      {
        title: "Nhà thiết kế đồ họa",
        description: "Sáng tạo các thiết kế có ý nghĩa và thẩm mỹ.",
        schools: ["Đại học Mỹ thuật Việt Nam", "Đại học Kiến trúc Hà Nội", "Đại học FPT"],
      },
      {
        title: "Giáo viên/Giảng viên nhân văn",
        description: "Truyền cảm hứng và hướng dẫn học sinh/sinh viên phát triển.",
        schools: ["Đại học Sư phạm Hà Nội", "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN"],
      },
    ],
  },
  ENFJ: {
    title: "Người Chủ Xướng (Protagonist)",
    description:
      "Nhà lãnh đạo đầy cảm hứng và quyến rũ, có thể mê hoặc người nghe của mình. Bạn là người có khả năng truyền cảm hứng, quan tâm đến người khác và có khả năng lãnh đạo tự nhiên.",
    strengths: ["Lãnh đạo", "Đồng cảm", "Truyền cảm hứng", "Quyết đoán", "Đáng tin cậy"],
    careers: [
      {
        title: "Giáo viên/Giảng viên",
        description: "Truyền cảm hứng và phát triển tiềm năng của học sinh/sinh viên.",
        schools: ["Đại học Sư phạm Hà Nội", "Đại học Sư phạm TP.HCM", "Đại học Giáo dục - ĐHQGHN"],
      },
      {
        title: "Nhà tư vấn hướng nghiệp",
        description: "Hướng dẫn mọi người tìm ra con đường sự nghiệp phù hợp.",
        schools: ["Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN", "Đại học Sư phạm Hà Nội"],
      },
      {
        title: "Chuyên gia PR/Truyền thông",
        description: "Xây dựng và duy trì hình ảnh tích cực cho tổ chức.",
        schools: ["Học viện Báo chí và Tuyên truyền", "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN"],
      },
      {
        title: "Nhà quản lý nhân sự",
        description: "Phát triển và quản lý nguồn nhân lực trong tổ chức.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Lao động - Xã hội", "Đại học Kinh tế TP.HCM"],
      },
    ],
  },
  ENFP: {
    title: "Người Truyền Cảm Hứng (Campaigner)",
    description:
      "Nhà tiên phong nhiệt tình, sáng tạo và hòa đồng, luôn có thể tìm thấy lý do để mỉm cười. Bạn là người nhiệt tình, sáng tạo và luôn tìm kiếm khả năng mới.",
    strengths: ["Sáng tạo", "Nhiệt tình", "Thích nghi", "Giao tiếp", "Tò mò"],
    careers: [
      {
        title: "Nhà sáng tạo nội dung",
        description: "Sáng tạo nội dung hấp dẫn và truyền cảm hứng.",
        schools: ["Học viện Báo chí và Tuyên truyền", "Đại học FPT", "Đại học Văn hóa Hà Nội"],
      },
      {
        title: "Chuyên gia marketing",
        description: "Phát triển chiến lược marketing sáng tạo và hiệu quả.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học FPT"],
      },
      {
        title: "Nhà tổ chức sự kiện",
        description: "Lên kế hoạch và tổ chức các sự kiện sáng tạo và thú vị.",
        schools: ["Đại học Văn hóa Hà Nội", "Đại học FPT", "Cao đẳng Du lịch Hà Nội"],
      },
      {
        title: "Diễn giả/Huấn luyện viên",
        description: "Truyền cảm hứng và động lực cho người khác.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Sư phạm Hà Nội", "Học viện Báo chí và Tuyên truyền"],
      },
    ],
  },

  // Các kiểu Người bảo vệ (Sentinels)
  ISTJ: {
    title: "Nhà Hậu Cần (Logistician)",
    description:
      "Cá nhân thực tế và có tính thực tế với khả năng đáng nể về sự chính xác và tổ chức. Bạn là người đáng tin cậy, có tổ chức và luôn tuân thủ quy tắc.",
    strengths: ["Đáng tin cậy", "Có tổ chức", "Thực tế", "Trung thành", "Kiên nhẫn"],
    careers: [
      {
        title: "Kế toán/Kiểm toán viên",
        description: "Quản lý và kiểm tra tài chính với độ chính xác cao.",
        schools: ["Đại học Kinh tế Quốc dân", "Học viện Tài chính", "Đại học Kinh tế TP.HCM"],
      },
      {
        title: "Quản lý hành chính",
        description: "Đảm bảo hoạt động hành chính diễn ra trơn tru và hiệu quả.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Nội vụ Hà Nội", "Học viện Hành chính Quốc gia"],
      },
      {
        title: "Kỹ sư chất lượng",
        description: "Đảm bảo sản phẩm và quy trình đáp ứng các tiêu chuẩn chất lượng.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Công nghiệp Hà Nội", "Đại học Kỹ thuật Công nghiệp Thái Nguyên"],
      },
      {
        title: "Chuyên gia an ninh mạng",
        description: "Bảo vệ hệ thống thông tin khỏi các mối đe dọa an ninh.",
        schools: ["Đại học Bách Khoa Hà Nội", "Học viện Kỹ thuật Mật mã", "Đại học FPT"],
      },
    ],
  },
  ISFJ: {
    title: "Người Bảo Vệ (Defender)",
    description:
      "Người bảo vệ rất tận tụy và ấm áp, luôn sẵn sàng bảo vệ những người họ yêu thương. Bạn là người chu đáo, đáng tin cậy và luôn quan tâm đến nhu cầu của người khác.",
    strengths: ["Đáng tin cậy", "Chu đáo", "Kiên nhẫn", "Tận tâm", "Có tổ chức"],
    careers: [
      {
        title: "Y tá/Điều dưỡng",
        description: "Chăm sóc và hỗ trợ bệnh nhân với sự tận tâm.",
        schools: ["Đại học Y Hà Nội", "Đại học Điều dưỡng Nam Định", "Đại học Y Dược TP.HCM"],
      },
      {
        title: "Giáo viên tiểu học",
        description: "Hướng dẫn và chăm sóc học sinh nhỏ tuổi.",
        schools: ["Đại học Sư phạm Hà Nội", "Đại học Sư phạm TP.HCM", "Đại học Giáo dục - ĐHQGHN"],
      },
      {
        title: "Nhân viên xã hội",
        description: "Hỗ trợ những người gặp khó khăn trong cuộc sống.",
        schools: ["Đại học Lao động - Xã hội", "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN"],
      },
      {
        title: "Quản lý văn phòng",
        description: "Đảm bảo môi trường làm việc được tổ chức và hoạt động hiệu quả.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Thương mại", "Đại học Nội vụ Hà Nội"],
      },
    ],
  },
  ESTJ: {
    title: "Người Điều Hành (Executive)",
    description:
      "Nhà quản lý xuất sắc, luôn chú ý đến chi tiết và thích làm mọi thứ theo đúng cách. Bạn là người có tổ chức, quyết đoán và luôn tuân thủ quy tắc.",
    strengths: ["Có tổ chức", "Quyết đoán", "Trung thực", "Tận tâm", "Truyền thống"],
    careers: [
      {
        title: "Quản lý dự án",
        description: "Lập kế hoạch, tổ chức và giám sát các dự án đạt mục tiêu.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Kinh tế Quốc dân", "Đại học FPT"],
      },
      {
        title: "Quản lý tài chính",
        description: "Quản lý và tối ưu hóa nguồn lực tài chính của tổ chức.",
        schools: ["Đại học Kinh tế Quốc dân", "Học viện Tài chính", "Đại học Kinh tế TP.HCM"],
      },
      {
        title: "Quản lý chuỗi cung ứng",
        description: "Tối ưu hóa quy trình từ nhà cung cấp đến khách hàng.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học Giao thông Vận tải"],
      },
      {
        title: "Sĩ quan quân đội/Cảnh sát",
        description: "Lãnh đạo và thực thi pháp luật với sự kỷ luật cao.",
        schools: ["Học viện Cảnh sát Nhân dân", "Học viện Quân y", "Học viện Kỹ thuật Quân sự"],
      },
    ],
  },
  ESFJ: {
    title: "Người Lãnh Đạo (Consul)",
    description:
      "Người quan tâm, hòa đồng và phổ biến, luôn sẵn sàng giúp đỡ người khác. Bạn là người quan tâm, hòa đồng và luôn tìm cách tạo ra sự hài hòa.",
    strengths: ["Hòa đồng", "Đáng tin cậy", "Chu đáo", "Hợp tác", "Thực tế"],
    careers: [
      {
        title: "Nhân viên chăm sóc khách hàng",
        description: "Hỗ trợ và giải quyết vấn đề cho khách hàng.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Thương mại", "Đại học FPT"],
      },
      {
        title: "Nhân viên nhân sự",
        description: "Tuyển dụng, đào tạo và hỗ trợ nhân viên trong tổ chức.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Lao động - Xã hội", "Đại học Kinh tế TP.HCM"],
      },
      {
        title: "Điều phối viên sự kiện",
        description: "Tổ chức và điều phối các sự kiện xã hội và doanh nghiệp.",
        schools: ["Đại học Văn hóa Hà Nội", "Đại học FPT", "Cao đẳng Du lịch Hà Nội"],
      },
      {
        title: "Nhân viên y tế cộng đồng",
        description: "Cung cấp dịch vụ chăm sóc sức khỏe và giáo dục cho cộng đồng.",
        schools: ["Đại học Y tế Công cộng", "Đại học Y Hà Nội", "Đại học Y Dược TP.HCM"],
      },
    ],
  },

  // Các kiểu Khám phá (Explorers)
  ISTP: {
    title: "Thợ Thủ Công (Virtuoso)",
    description:
      "Nhà thực nghiệm táo bạo và thực tế, bậc thầy của tất cả các loại công cụ. Bạn là người thực tế, linh hoạt và giỏi giải quyết vấn đề.",
    strengths: ["Thực tế", "Linh hoạt", "Giải quyết vấn đề", "Tự lập", "Bình tĩnh"],
    careers: [
      {
        title: "Kỹ sư cơ khí",
        description: "Thiết kế và phát triển các hệ thống cơ khí.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Công nghiệp Hà Nội", "Đại học Kỹ thuật Công nghiệp Thái Nguyên"],
      },
      {
        title: "Thợ sửa chữa kỹ thuật",
        description: "Sửa chữa và bảo trì các thiết bị và hệ thống phức tạp.",
        schools: ["Đại học Bách Khoa Hà Nội", "Cao đẳng Nghề Kỹ thuật Công nghệ", "Đại học Sư phạm Kỹ thuật TP.HCM"],
      },
      {
        title: "Phi công",
        description: "Điều khiển máy bay với sự chính xác và kỹ năng kỹ thuật cao.",
        schools: ["Học viện Hàng không Việt Nam", "Học viện Phòng không - Không quân"],
      },
      {
        title: "Kỹ thuật viên IT",
        description: "Giải quyết các vấn đề kỹ thuật và bảo trì hệ thống IT.",
        schools: ["Đại học Bách Khoa Hà Nội", "Đại học Công nghệ - ĐHQGHN", "Đại học FPT"],
      },
    ],
  },
  ISFP: {
    title: "Nghệ Sĩ (Adventurer)",
    description:
      "Nghệ sĩ linh hoạt và quyến rũ, luôn sẵn sàng khám phá và trải nghiệm điều mới mẻ. Bạn là người nhạy cảm, sáng tạo và luôn sống trong hiện tại.",
    strengths: ["Sáng tạo", "Nhạy cảm", "Thẩm mỹ", "Thực tế", "Hòa đồng"],
    careers: [
      {
        title: "Nghệ sĩ/Họa sĩ",
        description: "Sáng tạo các tác phẩm nghệ thuật thể hiện cảm xúc và thẩm mỹ.",
        schools: ["Đại học Mỹ thuật Việt Nam", "Đại học Mỹ thuật TP.HCM", "Đại học Kiến trúc Hà Nội"],
      },
      {
        title: "Nhà thiết kế thời trang",
        description: "Thiết kế quần áo và phụ kiện thời trang.",
        schools: ["Đại học Mỹ thuật Công nghiệp", "Đại học Kiến trúc Hà Nội", "Đại học Văn Lang"],
      },
      {
        title: "Đầu bếp",
        description: "Sáng tạo các món ăn ngon và đẹp mắt.",
        schools: ["Cao đẳng Du lịch Hà Nội", "Trường Cao đẳng Nghề Du lịch và Dịch vụ Hà Nội", "Đại học Văn Lang"],
      },
      {
        title: "Nhà trị liệu massage",
        description: "Cung cấp dịch vụ massage và trị liệu thư giãn.",
        schools: ["Đại học Y Hà Nội", "Đại học Y Dược TP.HCM", "Cao đẳng Y Hà Nội"],
      },
    ],
  },
  ESTP: {
    title: "Doanh Nhân (Entrepreneur)",
    description:
      "Người thông minh, năng lượng và rất thực tế, luôn yêu thích sống trên cạnh tranh. Bạn là người năng động, thực tế và thích mạo hiểm.",
    strengths: ["Năng động", "Thực tế", "Thuyết phục", "Quyết đoán", "Giải quyết vấn đề"],
    careers: [
      {
        title: "Nhân viên kinh doanh",
        description: "Thuyết phục khách hàng và đạt được mục tiêu bán hàng.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học Thương mại"],
      },
      {
        title: "Môi giới bất động sản",
        description: "Kết nối người mua và người bán bất động sản.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Kinh tế TP.HCM", "Đại học Xây dựng"],
      },
      {
        title: "Doanh nhân",
        description: "Khởi nghiệp và điều hành doanh nghiệp với sự năng động.",
        schools: ["Đại học Kinh tế Quốc dân", "Đại học Ngoại thương", "Đại học FPT"],
      },
      {
        title: "Huấn luyện viên thể thao",
        description: "Huấn luyện và phát triển kỹ năng thể thao cho vận động viên.",
        schools: ["Đại học Thể dục Thể thao Bắc Ninh", "Đại học Thể dục Thể thao TP.HCM"],
      },
    ],
  },
  ESFP: {
    title: "Người Giải Trí (Entertainer)",
    description:
      "Người trình diễn tự phát, nhiệt tình và năng động, cuộc sống không bao giờ nhàm chán xung quanh họ. Bạn là người vui vẻ, hòa đồng và luôn sống trong hiện tại.",
    strengths: ["Hòa đồng", "Nhiệt tình", "Thực tế", "Quan sát", "Sáng tạo"],
    careers: [
      {
        title: "Diễn viên/Ca sĩ",
        description: "Biểu diễn và giải trí cho khán giả.",
        schools: [
          "Đại học Sân khấu Điện ảnh Hà Nội",
          "Học viện Âm nhạc Quốc gia Việt Nam",
          "Đại học Văn hóa Nghệ thuật Quân đội",
        ],
      },
      {
        title: "Hướng dẫn viên du lịch",
        description: "Dẫn dắt và giải trí cho du khách trong các chuyến tham quan.",
        schools: ["Đại học Văn hóa Hà Nội", "Cao đẳng Du lịch Hà Nội", "Đại học Văn Lang"],
      },
      {
        title: "Nhân viên quan hệ công chúng",
        description: "Xây dựng và duy trì mối quan hệ tích cực với công chúng.",
        schools: ["Học viện Báo chí và Tuyên truyền", "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN"],
      },
      {
        title: "Nhà tạo mẫu tóc/Chuyên gia làm đẹp",
        description: "Tạo kiểu tóc và làm đẹp cho khách hàng.",
        schools: ["Cao đẳng Nghề Việt Nam - Hàn Quốc", "Cao đẳng Nghề Kỹ thuật Công nghệ"],
      },
    ],
  },
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "INFJ"
  const [isLoaded, setIsLoaded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const personalityInfo = personalityTypes[type as keyof typeof personalityTypes]
  const careers = personalityInfo.careers

  useEffect(() => {
    setIsLoaded(true)

    // Trigger confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true)

      // Run confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Kết quả tính cách MBTI của tôi: ${type}`,
          text: `Tôi vừa làm bài kiểm tra tính cách MBTI và kết quả là ${type}: ${personalityInfo.title}. Hãy thử và xem kết quả của bạn!`,
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(
          `Kết quả tính cách MBTI của tôi: ${type} - ${personalityInfo.title}. Hãy thử và xem kết quả của bạn tại: ${window.location.origin}`,
        )
        alert("Đã sao chép liên kết vào clipboard!")
      }
    } catch (error) {
      console.error("Error sharing:", error)

      // Fallback if sharing fails
      try {
        navigator.clipboard.writeText(
          `Kết quả tính cách MBTI của tôi: ${type} - ${personalityInfo.title}. Hãy thử và xem kết quả của bạn tại: ${window.location.origin}`,
        )
        alert("Đã sao chép liên kết vào clipboard!")
      } catch (clipboardError) {
        console.error("Clipboard error:", clipboardError)
        alert("Không thể chia sẻ kết quả. Vui lòng sao chép URL thủ công.")
      }
    }
  }

  const handleDownload = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 630
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#e6f7ff")
      gradient.addColorStop(1, "#e6fffa")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Border
      ctx.strokeStyle = "#0d9488"
      ctx.lineWidth = 20
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

      // Title
      ctx.fillStyle = "#0d9488"
      ctx.font = "bold 60px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Kết Quả Tính Cách MBTI", canvas.width / 2, 100)

      // MBTI Type
      ctx.font = "bold 120px Arial"
      ctx.fillText(type, canvas.width / 2, 250)

      // Personality Title
      ctx.font = "bold 50px Arial"
      ctx.fillText(personalityInfo.title, canvas.width / 2, 330)

      // Description
      ctx.font = "30px Arial"
      ctx.fillStyle = "#334155"

      // Wrap text function
      const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(" ")
        let line = ""
        let testLine = ""
        let lineCount = 0

        for (let n = 0; n < words.length; n++) {
          testLine = line + words[n] + " "
          const metrics = ctx.measureText(testLine)
          const testWidth = metrics.width

          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y + lineCount * lineHeight)
            line = words[n] + " "
            lineCount++
          } else {
            line = testLine
          }
        }

        ctx.fillText(line, x, y + lineCount * lineHeight)
        return lineCount
      }

      const lineCount = wrapText(personalityInfo.description, canvas.width / 2, 400, 1000, 40)

      // Footer
      ctx.fillStyle = "#0d9488"
      ctx.font = "30px Arial"
      ctx.fillText("minhduyy.id.vn", canvas.width / 2, 580)

      // Convert to image and download
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `MBTI-${type}.png`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 dark:border-gray-800 sticky top-0 z-10">
        <Link className="flex items-center justify-center" href="/">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text"
          >
            Định Hướng Nghề Nghiệp
          </motion.span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-teal-500 transition-colors" href="/about">
            Giới thiệu
          </Link>
          <Link className="text-sm font-medium hover:text-teal-500 transition-colors" href="/contact">
            Liên hệ
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center space-y-2"
          >
            <div className="inline-block rounded-lg bg-teal-500/20 px-3 py-1 text-sm text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 mb-2">
              <Award className="inline-block w-4 h-4 mr-1" /> Kết quả của bạn
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Kết Quả Tính Cách Của Bạn</h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Dựa trên câu trả lời của bạn, chúng tôi đã xác định kiểu tính cách MBTI của bạn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 dark:from-teal-500/5 dark:to-blue-500/5"></div>
              <CardHeader className="relative z-10 text-center border-b pb-6">
                <div className="mx-auto mb-4 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur-sm animate-pulse"></div>
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white dark:bg-gray-900 text-3xl font-bold text-teal-600 dark:text-teal-400 border-4 border-teal-500">
                      {type}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
                  {personalityInfo.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                  Kiểu tính cách MBTI của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 relative z-10">
                <div className="p-4 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-teal-100 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">{personalityInfo.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-teal-700 dark:text-teal-300 flex items-center">
                    <Award className="mr-2 h-5 w-5" /> Điểm mạnh của bạn:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {personalityInfo.strengths.map((strength, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800"
                      >
                        <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                        {strength}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                  {[
                    {
                      letter: type.charAt(0),
                      label: type.charAt(0) === "E" ? "Hướng Ngoại" : "Hướng Nội",
                      color: "bg-blue-500",
                    },
                    {
                      letter: type.charAt(1),
                      label: type.charAt(1) === "S" ? "Thực Tế" : "Trực Quan",
                      color: "bg-green-500",
                    },
                    {
                      letter: type.charAt(2),
                      label: type.charAt(2) === "T" ? "Lý Trí" : "Cảm Tính",
                      color: "bg-red-500",
                    },
                    {
                      letter: type.charAt(3),
                      label: type.charAt(3) === "J" ? "Nguyên Tắc" : "Linh Hoạt",
                      color: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`flex items-center justify-center w-16 h-16 rounded-full ${item.color} text-white text-2xl font-bold mb-2 shadow-lg`}
                      >
                        {item.letter}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Tabs defaultValue="careers" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="careers"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  <Briefcase className="mr-2 h-4 w-4" /> Nghề Nghiệp Phù Hợp
                </TabsTrigger>
                <TabsTrigger
                  value="schools"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  <School className="mr-2 h-4 w-4" /> Trường Học Gợi Ý
                </TabsTrigger>
              </TabsList>
              <TabsContent value="careers" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" /> Nghề Nghiệp Phù Hợp
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dựa trên kiểu tính cách MBTI của bạn, những nghề nghiệp sau đây có thể phù hợp với điểm mạnh và sở
                    thích tự nhiên của bạn.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {careers.map((career, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-gray-900/90">
                          <CardHeader className="pb-2 border-b">
                            <CardTitle className="text-teal-600 dark:text-teal-400">{career.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-gray-600 dark:text-gray-400">{career.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="schools" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 flex items-center">
                    <School className="mr-2 h-5 w-5" /> Trường Học Gợi Ý
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dưới đây là các trường đại học và cao đẳng tại Việt Nam phù hợp với các ngành nghề được đề xuất cho
                    kiểu tính cách của bạn.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {careers.map((career, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-gray-900/90">
                          <CardHeader className="pb-2 border-b">
                            <CardTitle className="text-teal-600 dark:text-teal-400">{career.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Trường học phù hợp:</h3>
                            <ul className="space-y-1">
                              {career.schools.map((school, idx) => (
                                <li key={idx} className="text-gray-600 dark:text-gray-400 flex items-start">
                                  <div className="h-2 w-2 rounded-full bg-teal-500 mt-2 mr-2 flex-shrink-0"></div>
                                  {school}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/test">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/30 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Làm Lại Bài Kiểm Tra
              </Button>
            </Link>
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" /> Chia Sẻ Kết Quả
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Tải Kết Quả
            </Button>
          </motion.div>
        </div>
      </main>
      <footer className="w-full py-4 px-4 md:px-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 dark:border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Định Hướng Nghề Nghiệp. Bản quyền thuộc về{" "}
            <a
              href="https://minhduyy.id.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:underline"
            >
              minhduyy.id.vn
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

