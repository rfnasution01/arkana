/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import AxiosClient from "@/providers/axios.tsx";
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
}

export const UploadFileInput = ({
	isRow,
	keyname,
	name,
	label,
	form,
	formatFileLabel,
	accept = "image/*,application/pdf",
	isRequired,
}: Props) => {
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
	};

	const getFileName = (fileUrl: string) => {
		try {
			const pathname = new URL(fileUrl).pathname;
			return pathname.substring(pathname.lastIndexOf("/") + 1);
		} catch {
			return "";
		}
	};

	return (
		<div
			className={
				isRow ? "grid grid-cols-[12rem_1fr] gap-5" : "flex flex-col gap-2"
			}
		>
			<Label htmlFor={"file"} className={"text-[#666] text-sm"}>
				{label} {isRequired && <span className="text-red-500">*</span>}
			</Label>
			{form.watch(name) ? (
				<>
					<div className="p-2 bg-white flex items-center justify-between border">
						<Link
							to={form.watch(name)}
							target={"_blank"}
							className={"text-primary whitespace-nowrap text-sm"}
						>
							{getFileName(form.watch(name))}
						</Link>
						<Trash2
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								RemoveFile();
							}}
							className={"size-4 text-red-500"}
						/>
					</div>
				</>
			) : (
				// <Input
				//   id={'file'}
				//   // onChange={(e) => HandleUploadBerkas(e.target.files)}
				//   className={'bg-white'}
				//   type={'file'}
				// />
				<Button
					onClick={(e) => {
						e.preventDefault();
						refButtton.current?.click();
					}}
					className="border border-primary bg-white"
					variant={"outline"}
				>
					<Upload />
					Upload File
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
			<FormMessage />
		</div>
	);
};
