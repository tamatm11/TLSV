/** @format */

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PaymentDialog = ({ course, open, onOpenChange }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!course) return null;

  const paymentInfo = {
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    accountName: "NGUYEN VAN A",
    amount: course.price,
    content: `THANHTOAN ${course.id}`,
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Đã sao chép!",
      description: `${label} đã được sao chép vào bộ nhớ tạm`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Thông Tin Thanh Toán
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">
                Khóa học: {course.title}
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {course.price.toLocaleString("vi-VN")}đ
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                Chuyển khoản ngân hàng
              </h3>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Ngân hàng</div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {paymentInfo.bankName}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(paymentInfo.bankName, "Tên ngân hàng")
                      }>
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Số tài khoản</div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {paymentInfo.accountNumber}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(paymentInfo.accountNumber, "Số tài khoản")
                      }>
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">
                    Chủ tài khoản
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {paymentInfo.accountName}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(paymentInfo.accountName, "Tên chủ tài khoản")
                      }>
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="text-sm text-yellow-800 mb-1 font-medium">
                    Nội dung chuyển khoản (Bắt buộc)
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      {paymentInfo.content}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(paymentInfo.content, "Nội dung chuyển khoản")
                      }>
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Quét mã QR</h3>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1617069003331-36dc9c0e8f8b?w=300&h=300&fit=crop"
                  alt="QR Code for payment"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Mở ứng dụng ngân hàng để quét mã
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">
              Lưu ý quan trọng:
            </h4>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li>
                Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống tự
                động kích hoạt.
              </li>
              <li>
                Khóa học sẽ được kích hoạt trong vòng 24h sau khi thanh toán
                thành công.
              </li>
              <li>
                Vui lòng lưu lại ảnh chụp màn hình giao dịch để đối chiếu khi
                cần thiết.
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
