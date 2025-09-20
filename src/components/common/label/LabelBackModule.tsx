/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
interface Props {
	label: string;
	link?: string;
	button?: any;
}
const LabelBackModule = (props: Props) => {
	const { label, link, button } = props;
	return (
		<div className="flex justify-between items-center gap-4">
			<div className="flex gap-2 items-center">
				{link && (
					<Link
						to={link}
						className="bg-white size-10 rounded-full flex justify-center items-center"
					>
						<ArrowLeft className="text-primary" />
					</Link>
				)}
				<h2 className="text-xl text-[#000957] font-bold">{label}</h2>
			</div>

			{button ?? <></>}
		</div>
	);
};

export default LabelBackModule;
