/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import AxiosClient from "@/providers/axios";
import { Trash2, Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";

interface Props {
	label?: string;
	form: any;
	name: string;
	keyname: string;
	isRow?: boolean;
	formatFileLabel?: string;
	accept?: string;
	isRequired?: boolean;
	className?: string;
	labelInner?: string;
	url?: string;
	field_date?: string;
}
const UploadFileInputNew = (props: Props) => {
	const {
		form,
		keyname,
		label,
		labelInner,
		name,
		accept,
		formatFileLabel,
		isRequired,
		isRow,
		className,
		url,
		field_date,
	} = props;

	const HandleUploadBerkas = async (e: FileList | null) => {
		if (e) {
			const formdata = new FormData();
			formdata.append("", e[0]);
			await AxiosClient.post("", formdata)
				.then((res) => {
					if (res?.data?.status) {
						toast.success("Success Upload");
						form.setValue(name, res?.data?.url);
						form.setValue(keyname, e[0].name);
						form.setValue(field_date, new Date().toISOString());
					}
				})
				.catch((err) => {
					toast.error(
						err?.response?.data?.error?.message || "Internal System Error"
					);
				});
		}
	};

	const refButtton = useRef<HTMLInputElement | null>(null);

	const RemoveFile = () => {
		form.setValue(name, null);
		form.setValue(keyname, null);
		form.setValue(field_date, null);
	};

	return (
		<FormField
			control={form.control}
			name={name}
			render={({}) => (
				<FormItem
					className={`whitespace-nowrap 
          ${
						isRow
							? `flex flex-col gap-4 md:grid md:grid-cols-[12rem_1fr] md:flex-row md:items-center md:gap-5`
							: "flex flex-col gap-2"
					} 
          ${className} w-full`}
				>
					{label && (
						<FormLabel className={"text-blue-500 text-sm"}>
							{label} {isRequired && <span className="text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<div className="relative w-full">
							{form.watch(name) ? (
								<>
									<div className="p-2 bg-white flex gap-4 items-center justify-between border relative">
										<a
											href={form.watch(name)}
											target={"_blank"}
											rel="noopener noreferrer"
											className={
												"text-primary whitespace-nowrap text-sm w-full"
											}
										>
											<div className="flex items-center">
												<img
													src={url}
													className="object-contain h-[100px] mx-auto"
												/>
											</div>
										</a>
										<Trash2
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												RemoveFile();
											}}
											className={
												"size-4 min-h-[16px] min-w-[16px] text-red-500 absolute top-2 right-2"
											}
										/>
									</div>
								</>
							) : (
								<Button
									onClick={(e) => {
										e.preventDefault();
										refButtton.current?.click();
									}}
									className="border border-primary w-full bg-white flex gap-2 justify-start"
									variant={"outline"}
								>
									<Upload />
									Upload {labelInner}
								</Button>
							)}
							<div className="text-xs text-independence">{formatFileLabel}</div>

							<input
								type="file"
								hidden
								ref={refButtton}
								accept={accept}
								onChange={(e) => HandleUploadBerkas(e.target.files)}
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default UploadFileInputNew;
