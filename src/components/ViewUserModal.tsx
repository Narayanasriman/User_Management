import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "../types";

import { getCountries } from "../services/api";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onAddUser: () => void;
  user: User | null;
}

export const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onAddUser,
  user,
}) => {
  if (!user) return null;

  const countries = getCountries();

  const capitalize = (text: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const getCountryNames = (codes: string[]) => {
    return codes.map(
      (code) => countries.find((c) => c.code === code)?.name || code
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[680px] w-full min-h-[540px] bg-white border border-gray-200 shadow-xl rounded-xl p-0">
        {/* Header */}
       {/* Header */}
<DialogHeader className="px-6 pt-7 pb-0">
  <DialogTitle className="text-lg font-semibold text-gray-900">
    View Details
  </DialogTitle>
</DialogHeader>
{/* Full-width HR */}
<hr className="border-gray-200 w-full m-0" />
{/* User Details below HR */}
<div className="px-6 mt-3 mb-1">
  <span className="text-lg font-semibold text-gray-900">User Details</span>
</div>





        {/* Content */}
        <div className="px-6 pb-[220px]  space-y-5">
          <div className="grid grid-cols-2 gap-3">
           

            {/* User Name */}
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block leading-none">
                User Name
              </label>
              <p className="text-sm font-medium text-gray-900 mt-[2px]">
                {capitalize(user.userName)}
              </p>
            </div>

            {/* User Code */}
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block leading-none">
                User Code
              </label>
              <p className="text-sm font-medium text-gray-900 mt-[2px]">
                {user.userCode || "-"}
              </p>
            </div>
          </div>

          {/* Countries */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block leading-none">
              Countries
            </label>
            <div className="flex flex-wrap gap-2 mt-[4px]">
              {getCountryNames(user.countries).map((country, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-normal pointer-events-none capitalize"
                >
                  {capitalize(country)}
                </Button>
              ))}
            </div>
          </div>

          {/* Bottom hr — with space above */}
          {/* <hr className="mt-6 border-gray-200" /> */}
        </div>

        {/* Footer */}
    {/* Footer */}
<div className="flex justify-between items-center px-6 py-3.5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
  <Button
    type="button"
    variant="outline"
    onClick={onAddUser}
    className="rounded-full min-w-[120px] h-9 px-4 text-sm border-gray-400 bg-white hover:bg-gray-100 font-normal shadow-none"
  >
    Add New User
  </Button>
  <div className="flex gap-2.5">
    <Button
      type="button"
      variant="outline"
      onClick={onClose}
      className="rounded-full min-w-[90px] h-9 px-4 font-medium text-sm text-gray-900 border-none shadow-none"
      style={{ background: "#00438A0F" }}
    >
      Cancel
    </Button>
    <Button
      type="button"
      onClick={onEdit}
      className="rounded-full min-w-[90px] h-9 px-4 font-medium text-sm bg-black hover:bg-gray-900 text-white shadow-none"
    >
      Edit
    </Button>
  </div>
</div>




      </DialogContent>
    </Dialog>
  );
};
