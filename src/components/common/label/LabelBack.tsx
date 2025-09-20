import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
interface Props {
  label: string;
  link: string;
  showSeparator?: boolean;
}
const LabelBack = (props: Props) => {
  const { label, link, showSeparator = true } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Link to={link}>
          <ArrowLeft />
        </Link>
        <h2 className="text-xl text-[#000957] font-bold">{label}</h2>
      </div>

      {showSeparator && <Separator />}
    </div>
  );
};

export default LabelBack;
