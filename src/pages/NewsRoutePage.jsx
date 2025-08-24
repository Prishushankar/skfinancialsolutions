import NewsPage from "../components/NewsPage";
import WhatsAppFloat from "../components/WhatsAppFloat";

const NewsRoutePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
      <NewsPage />
      <WhatsAppFloat />
    </div>
  );
};

export default NewsRoutePage;
