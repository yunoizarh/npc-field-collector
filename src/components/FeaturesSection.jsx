import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  CloudOff, // Icon for Offline Collection
  RefreshCw, // Icon for Auto Sync
  MonitorCheck, // Icon for Real-time View
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, caption }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
    <div className="p-4 rounded-full bg-green-50 text-green-600 mb-4">
      {/* Icon is rendered here, size h-8 w-8 */}
      <Icon className="size-12" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{caption}</p>
  </div>
);

// --- Features Section Component ---
const FeaturesSection = () => {
  const features = [
    {
      icon: CloudOff,
      title: "Offline Collection",
      caption:
        "Seamlessly gather data even without an active internet connection on any device.",
    },
    {
      icon: RefreshCw,
      title: "Automatic Sync",
      caption:
        "Data is automatically synchronized to the cloud instantly when connectivity is restored.",
    },
    {
      icon: MonitorCheck,
      title: "Real-time View",
      caption:
        "Monitor collection progress and instantly view aggregated results as they are submitted.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 sm:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Reliable Features for Any Environment
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Designed to work where you need it most, ensuring data integrity
            always comes first.
          </p>
        </div>

        {/* Feature Grid: 1 column on mobile, 3 columns on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
