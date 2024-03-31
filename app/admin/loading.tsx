import { Loader2 } from "lucide-react";

function AdminLoading() {
  return (
    <div className="flex justify-center align-center h-screen">
      <Loader2 className="size-24 text-slate-500 animate-spin" />
    </div>
  );
}

export default AdminLoading;
