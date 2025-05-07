import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
// import NumberTicker from "@/components/magicui/number-ticket";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DashboardPageHeader } from "@/modules/admin-panel/layout/dashboard-page-header";
// import { useTableAnnualSummary } from "@/hooks/sales/annual-summary/useTableAnnualSummary";
// import { MainSelectSimpleCombobox } from "@/common/molecules/main-select-combobox/MainSelectSimpleCombobox";
import {
  BellIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";
import { useAuth } from "@/hooks/useAuth";


export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Evento 1",
    designation: "Finca la paila",
    content: (
      <p>
        <Highlight>10 personas</Highlight>
        Descripción...
      </p>
    ),
  },
  {
    id: 1,
    name: "Evento 2",
    designation: "Santa eventos",
    content: (
      <p>
        <Highlight>4 personas</Highlight> 
        Descripción...
      </p>
    ),
  },
  {
    id: 2,
    name: "Evento 3",
    designation: "Evento salida",
    content: (
      <p>
        <Highlight>50 personas</Highlight>
        Descripción...
      </p>
    ),
  },
];

const features = [
  {
    Icon: Calendar,
    name: "Eventos disponibles",
    description: "Listado de eventos disponibles.",
    href: "/",
    cta: "Leer más",
    background: <CardStack items={CARDS}  />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 ",
  },
  {
    Icon: FileTextIcon,
    name: "Eventos disponibles",
    description: "Listado de eventos disponibles.",
    href: "/",
    cta: "Leer más",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 ",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: InputIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export const Dashboard = () => {
  const { user }= useAuth();
  console.log(user);

  // const fetchJWT = async () => {
  //   const token = await getToken();
  //   console.log("JWT:", token);
  // };

  // useEffect(() => {
  //   fetchJWT();
  // }, []);

  return (
    <div className="xl:py-8 md:pt-4 pt-5 pb-8 px-5 md:px-14 h-auto bg-background flex items-center">
      <BentoGrid className="lg:grid-rows-3 mt-30 mx-auto">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>

    </div>
  );
};