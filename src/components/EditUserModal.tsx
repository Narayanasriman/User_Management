import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import { getCountries } from "../services/api";
import type { User, UserFormData, ValidationErrors } from "../types";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void>;
  user: User | null;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    userName: "",
    userCode: "",
    countries: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justClosedByButton, setJustClosedByButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        userCode: user.userCode || "",
        countries: user.countries || [],
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!formData.userName.trim())
      newErrors.userName = "User name is required";
    if (formData.countries.length === 0)
      newErrors.countries = "At least one country must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSave(formData);
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setErrors({});
    setIsDropdownOpen(false);
    onClose();
  };

  const addCountry = (code: string) => {
    if (!formData.countries.includes(code)) {
      setFormData({
        ...formData,
        countries: [...formData.countries, code],
      });
      setSearchTerm("");
      setIsDropdownOpen(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const removeCountry = (code: string) => {
    setFormData({
      ...formData,
      countries: formData.countries.filter((c) => c !== code),
    });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const filteredCountries = getCountries().filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.countries.includes(country.code)
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl pt-6 px-10 pb-6 relative max-w-3xl w-full mx-4 min-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between mt-0">
          <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
          <button
            onClick={handleClose}
            className="hover:bg-gray-100 rounded-full p-2"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Line under title */}
        <div className="-mx-10 mt-6 mb-5">
          <hr className="border-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Name */}
          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              User Name
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Enter a User Name"
              className={`w-full h-9 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                errors.userName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.userName && (
              <p className="text-xs text-red-500 mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Code */}
          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              Set Code{" "}
              <span className="text-gray-400 font-normal text-sm">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              value={formData.userCode}
              onChange={(e) =>
                setFormData({ ...formData, userCode: e.target.value })
              }
              placeholder="Short code (e.g., NA, EU)"
              className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Countries with chips and input */}
          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              Select Countries
            </label>
            <div className="relative w-full">
              <div
                className={`flex flex-wrap items-center gap-1 border rounded-md bg-white w-full min-w-0 min-h-[38px] h-auto px-2 py-1 focus-within:ring-2 focus-within:ring-black ${
                  errors.countries ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => inputRef.current?.focus()}
              >
                {formData.countries.map((code) => {
                  const country = getCountries().find((c) => c.code === code);
                  return (
                    <span
                      key={code}
                      className="flex items-center gap-1 bg-gray-200 text-gray-900 px-2 py-1 rounded-full text-xs whitespace-nowrap"
                    >
                      {country?.name}
                      <button
                        type="button"
                        onClick={() => removeCountry(code)}
                        className="hover:text-red-500 ml-1"
                        tabIndex={-1}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                <input
                  ref={inputRef}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => {
                    if (justClosedByButton) {
                      setJustClosedByButton(false);
                      return;
                    }
                    setIsDropdownOpen(true);
                  }}
                  placeholder={
                    formData.countries.length === 0
                      ? "Type or select countries..."
                      : ""
                  }
                  className="flex-grow min-w-[120px] h-8 border-none text-sm outline-none bg-transparent px-1"
                  style={{ minWidth: 0 }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsDropdownOpen((open) => {
                      if (open) setJustClosedByButton(true);
                      return !open;
                    })
                  }
                  tabIndex={-1}
                  className="p-1 mr-1"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-[180px] overflow-y-auto z-50">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => addCountry(country.code)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {country.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.countries && (
              <p className="text-xs text-red-500 mt-1">{errors.countries}</p>
            )}
          </div>

          <div className="h-8" />
          <div className="-mx-10 pt-[103px] mb-10">
            <hr className="border-gray-200" />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
