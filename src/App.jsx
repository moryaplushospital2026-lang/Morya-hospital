import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/admin/AdminLayout";
import { ChangePasswordPage } from "@/admin/ChangePasswordPage";
import { DashboardPage } from "@/admin/DashboardPage";
import { LoginPage } from "@/admin/LoginPage";
import { ProtectedRoute } from "@/admin/ProtectedRoute";
import { ResourcePage } from "@/admin/ResourcePage";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AboutPage } from "@/pages/AboutPage";
import { BlogDetailPage } from "@/pages/BlogDetailPage";
import { BlogPage } from "@/pages/BlogPage";
import { ContactPage } from "@/pages/ContactPage";
import { DepartmentDetailPage } from "@/pages/DepartmentDetailPage";
import { DepartmentsPage } from "@/pages/DepartmentsPage";
import { DoctorsPage } from "@/pages/DoctorsPage";
import { FacilitiesPage } from "@/pages/FacilitiesPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { HomePage } from "@/pages/HomePage";
import { InsurancePartnersPage } from "@/pages/InsurancePartnersPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/morya_plus_the_admin_access_mp/login" element={<LoginPage />} />
        <Route
          path="/morya_plus_the_admin_access_mp"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="blogs" element={<ResourcePage resource="blogs" />} />
          <Route path="departments" element={<ResourcePage resource="departments" />} />
          <Route path="facilities" element={<ResourcePage resource="facilities" />} />
          <Route path="doctors" element={<ResourcePage resource="doctors" />} />
          <Route path="gallery" element={<ResourcePage resource="gallery" />} />
          <Route path="insurance" element={<ResourcePage resource="insurance" />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
        <Route
          path="*"
          element={
            <SiteLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/appointment" element={<HomePage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/departments/:slug" element={<DepartmentDetailPage />} />
                <Route path="/facilities" element={<FacilitiesPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/insurance-partners" element={<InsurancePartnersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </SiteLayout>
          }
        />
      </Routes>
    </>
  );
}
