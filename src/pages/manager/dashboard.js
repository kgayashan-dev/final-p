import { useRouter } from "next/router";
import AdminDashboard from "../panel/admin/admin-dashboard";

import Sidebar from "./manager-sidebar";
import Content4 from "../panel/content4";
import Content3 from "../panel/content3";
import Content2 from "../panel/content2";
import Content5 from "../panel/content5";
import Content6 from "../panel/content6";
import Content7 from "../panel/content7";
import Content8 from "../panel/content8";
import Content9 from "../panel/content9";
import Content10 from "../panel/content10";
import Content11 from "../panel/content11";
import Content12 from "../panel/content12";
import Content13 from "../panel/content13";
import Content14 from "../panel/content14";
import Content15 from "../panel/content15";
import Content16 from "../panel/content16";
import Content17 from "../panel/content17";
import Content18 from "../panel/content18";
import Content19 from "../panel/content19";
import Content20 from "../panel/content20";
import Content21 from "../panel/content21";
import Content23 from "../panel/content23";
import Nav from "../components/dashboard-navbar";

const AdminComponent = () => {
  const router = useRouter();
  const { query } = router;
  const selectedContent = query.content || "dashboard";

  // Render the content based on the selectedContent state

  const renderSelectedContent = () => {
    switch (selectedContent) {
      case "customer":
        return <Content4 />;

      case "managers-and-technicians":
        return <Content5 />;

      case "add-manager":
        return <Content21 />;

      case "send-email":
        return <Content7 />;

      case "view-rate":
        return <Content8 />;

      case "view-rate":
        return <Content3 />;

      case "customer-feedbacks":
        return <Content6 />;

      case "add-technician":
        return <Content2 />;

      case "assign-tech-job":
        return <Content10 />;

      case "technicians-job":
        return <Content9 />;

      case "tech-job-details":
        return <Content13 />;

      case "technicians":
        return <Content14 />;

      case "todo-list":
        return <Content15 />;

      case "job-summary":
        return <Content16 />;

      case "request-new-job":
        return <Content17 />;

      case "request-new-job":
        return <Content18 />;

      case "my-jobs":
        return <Content18 />;

      case "view-job":
        return <Content19 />;

      case "employee-status":
        return <Content20 />;

      case "add-manager":
        return <Content21 />;

      case "tech-cost-report":
        return <Content23 />;

      default:
        return null;
    }
  };

  return (
    <div>
      {/* <Nav></Nav> */}
      <div className="w-screen flex flex-row justify-start">
        <div>
          <Sidebar />
        </div>
        <div className="w-full">{renderSelectedContent()}</div>
      </div>
    </div>
  );
};

export default AdminComponent;
