
import { TabsContent } from "@/components/ui/tabs";
import ProductManagement from "./ProductManagement";
import AnnouncementsManagement from "./AnnouncementsManagement";
import PushNotificationsManagement from "./PushNotificationsManagement";
import CategoryManagement from "./CategoryManagement";
import OrdersManagement from "./OrdersManagement";
import AnalyticsSection from "./AnalyticsSection";
import VisitorAnalytics from "./VisitorAnalytics";

interface AdminTabsContentProps {
  onStatsUpdate: () => void;
}

const AdminTabsContent = ({ onStatsUpdate }: AdminTabsContentProps) => {
  return (
    <div className="p-6">
      <TabsContent value="products" className="m-0">
        <ProductManagement onStatsUpdate={onStatsUpdate} />
      </TabsContent>

      <TabsContent value="announcements" className="m-0">
        <AnnouncementsManagement onStatsUpdate={onStatsUpdate} />
      </TabsContent>

      <TabsContent value="push-notifications" className="m-0">
        <PushNotificationsManagement />
      </TabsContent>

      <TabsContent value="categories" className="m-0">
        <CategoryManagement onStatsUpdate={onStatsUpdate} />
      </TabsContent>

      <TabsContent value="orders" className="m-0">
        <OrdersManagement onStatsUpdate={onStatsUpdate} />
      </TabsContent>

      <TabsContent value="analytics" className="m-0">
        <AnalyticsSection onStatsUpdate={onStatsUpdate} />
      </TabsContent>

      <TabsContent value="visitors" className="m-0">
        <VisitorAnalytics />
      </TabsContent>
    </div>
  );
};

export default AdminTabsContent;
