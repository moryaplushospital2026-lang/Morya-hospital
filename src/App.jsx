import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SiteLayout } from "@/components/site/SiteLayout";

const AdminLayout = lazy(() =>
  import("@/admin/AdminLayout").then((module) => ({ default: module.AdminLayout })),
);
const ChangePasswordPage = lazy(() =>
  import("@/admin/ChangePasswordPage").then((module) => ({ default: module.ChangePasswordPage })),
);
const DashboardPage = lazy(() =>
  import("@/admin/DashboardPage").then((module) => ({ default: module.DashboardPage })),
);
const LoginPage = lazy(() =>
  import("@/admin/LoginPage").then((module) => ({ default: module.LoginPage })),
);
const ProtectedRoute = lazy(() =>
  import("@/admin/ProtectedRoute").then((module) => ({ default: module.ProtectedRoute })),
);
const ResourcePage = lazy(() =>
  import("@/admin/ResourcePage").then((module) => ({ default: module.ResourcePage })),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((module) => ({ default: module.AboutPage })),
);
const BlogDetailPage = lazy(() =>
  import("@/pages/BlogDetailPage").then((module) => ({ default: module.BlogDetailPage })),
);
const BlogPage = lazy(() =>
  import("@/pages/BlogPage").then((module) => ({ default: module.BlogPage })),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((module) => ({ default: module.ContactPage })),
);
const DepartmentDetailPage = lazy(() =>
  import("@/pages/DepartmentDetailPage").then((module) => ({
    default: module.DepartmentDetailPage,
  })),
);
const DepartmentsPage = lazy(() =>
  import("@/pages/DepartmentsPage").then((module) => ({ default: module.DepartmentsPage })),
);
const DoctorsPage = lazy(() =>
  import("@/pages/DoctorsPage").then((module) => ({ default: module.DoctorsPage })),
);
const FacilitiesPage = lazy(() =>
  import("@/pages/FacilitiesPage").then((module) => ({ default: module.FacilitiesPage })),
);
const GalleryPage = lazy(() =>
  import("@/pages/GalleryPage").then((module) => ({ default: module.GalleryPage })),
);
const HomePage = lazy(() =>
  import("@/pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const InsurancePartnersPage = lazy(() =>
  import("@/pages/InsurancePartnersPage").then((module) => ({
    default: module.InsurancePartnersPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
}
