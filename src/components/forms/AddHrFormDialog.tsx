"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Lock, Phone, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddHrFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddHrFormDialog({
  isOpen,
  onClose,
  onSuccess,
}: AddHrFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    profile_image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" && files) {
      setFormData({ ...formData, profile_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast({
        title: "Error",
        description: "Authentication token not found.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("password", formData.password);
    if (formData.profile_image) {
      data.append("profile_image", formData.profile_image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/hr/create/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: data,
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("HR create error:", errorData);
        throw new Error(
          errorData?.message
            ? JSON.stringify(errorData.message)
            : "Failed to create HR user.",
        );
      }

      toast({
        title: "Success!",
        description: "HR user created successfully.",
        className: "bg-green-500 text-white",
      });
      onSuccess();
      onClose();
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        profile_image: null,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-1rem)] h-[70vh] sm:h-[80vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>Add New HR</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new HR user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hr@example.com"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              name="mobile"
              placeholder="9876543210"
              value={formData.mobile}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="relative space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-7 h-8 w-8 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile_image">Profile Image</Label>
            <Input
              id="profile_image"
              name="profile_image"
              type="file"
              onChange={handleFormChange}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create HR"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
