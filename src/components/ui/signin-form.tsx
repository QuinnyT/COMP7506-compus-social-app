import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// 校区数据
const CAMPUS_OPTIONS = [
  { value: 'main', label: '主校区' },
  { value: 'north', label: '北校区' },
  { value: 'south', label: '南校区' },
  { value: 'east', label: '东校区' },
  { value: 'west', label: '西校区' },
];

// 登录方式枚举
enum LoginMethod {
  PHONE = 'phone',
  EMAIL = 'email',
}

// 登录步骤枚举
enum LoginStep {
  INPUT_INFO = 'input_info',
  VERIFY_CODE = 'verify_code',
  FIRST_LOGIN = 'first_login',
}

const SigninForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 状态管理
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(LoginMethod.PHONE);
  const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.INPUT_INFO);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // 表单数据
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    verificationCode: '',
    nickname: '',
    avatar: '',
    campus: '',
  });

  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 发送验证码
  const handleSendCode = async () => {
    if (!agreedToTerms) {
      toast({
        title: "请先同意服务条款",
        description: "请勾选服务条款后再继续",
        variant: "destructive",
      });
      return;
    }

    const contact = loginMethod === LoginMethod.PHONE ? formData.phone : formData.email;
    
    if (!contact) {
      toast({
        title: "请输入联系信息",
        description: loginMethod === LoginMethod.PHONE ? "请输入手机号" : "请输入邮箱",
        variant: "destructive",
      });
      return;
    }

    // 验证格式
    if (loginMethod === LoginMethod.PHONE && !/^1[3-9]\d{9}$/.test(contact)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的11位手机号",
        variant: "destructive",
      });
      return;
    }

    if (loginMethod === LoginMethod.EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      toast({
        title: "邮箱格式错误",
        description: "请输入正确的邮箱地址",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // 模拟发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "验证码已发送",
        description: `验证码已发送到${loginMethod === LoginMethod.PHONE ? '手机' : '邮箱'}`,
      });
      
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setCurrentStep(LoginStep.VERIFY_CODE);
    } catch (error) {
      toast({
        title: "发送失败",
        description: "验证码发送失败，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 验证验证码
  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      toast({
        title: "请输入验证码",
        description: "请输入收到的验证码",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // 模拟验证码验证
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟首次登录检查
      const isFirstLogin = Math.random() > 0.5; // 随机模拟是否首次登录
      
      if (isFirstLogin) {
        setCurrentStep(LoginStep.FIRST_LOGIN);
      } else {
        // 直接登录成功
        toast({
          title: "登录成功",
          description: "欢迎回来！",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "验证失败",
        description: "验证码错误，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 完成首次登录设置
  const handleCompleteFirstLogin = async () => {
    if (!formData.nickname || !formData.campus) {
      toast({
        title: "请完善信息",
        description: "请填写昵称和选择校区",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // 模拟保存用户信息
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "设置完成",
        description: "欢迎加入校园社交！",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "设置失败",
        description: "请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 返回上一步
  const handleBack = () => {
    if (currentStep === LoginStep.VERIFY_CODE) {
      setCurrentStep(LoginStep.INPUT_INFO);
      setFormData(prev => ({ ...prev, verificationCode: '' }));
    } else if (currentStep === LoginStep.FIRST_LOGIN) {
      setCurrentStep(LoginStep.VERIFY_CODE);
    }
  };

  // 处理头像上传
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            校园社交
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            连接校园，分享生活
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === LoginStep.INPUT_INFO && "登录"}
              {currentStep === LoginStep.VERIFY_CODE && "验证码验证"}
              {currentStep === LoginStep.FIRST_LOGIN && "完善个人信息"}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === LoginStep.INPUT_INFO && "选择登录方式"}
              {currentStep === LoginStep.VERIFY_CODE && "请输入收到的验证码"}
              {currentStep === LoginStep.FIRST_LOGIN && "请完善您的个人信息"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 输入信息步骤 */}
            {currentStep === LoginStep.INPUT_INFO && (
              <>
                <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as LoginMethod)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={LoginMethod.PHONE}>手机号登录</TabsTrigger>
                    <TabsTrigger value={LoginMethod.EMAIL}>邮箱登录</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={LoginMethod.PHONE} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="请输入手机号"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={LoginMethod.EMAIL} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">学校邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="请输入学校邮箱"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    我已阅读并同意
                    <a href="#" className="text-blue-600 hover:underline">
                      服务条款
                    </a>
                  </Label>
                </div>

                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || !agreedToTerms}
                  className="w-full"
                >
                  {isLoading ? "发送中..." : "发送验证码"}
                </Button>
              </>
            )}

            {/* 验证码验证步骤 */}
            {currentStep === LoginStep.VERIFY_CODE && (
              <>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      验证码已发送到
                      <span className="font-medium">
                        {loginMethod === LoginMethod.PHONE ? formData.phone : formData.email}
                      </span>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">验证码</Label>
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="请输入验证码"
                      value={formData.verificationCode}
                      onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    返回
                  </Button>
                  <Button
                    onClick={handleVerifyCode}
                    disabled={isLoading || !formData.verificationCode}
                    className="flex-1"
                  >
                    {isLoading ? "验证中..." : "验证"}
                  </Button>
                </div>

                {countdown > 0 && (
                  <p className="text-center text-sm text-gray-500">
                    {countdown}秒后可重新发送
                  </p>
                )}
              </>
            )}

            {/* 首次登录设置步骤 */}
            {currentStep === LoginStep.FIRST_LOGIN && (
              <>
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Label htmlFor="avatar">头像</Label>
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-gray-300">
                      {formData.avatar ? (
                        <img 
                          src={formData.avatar} 
                          alt="头像" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-lg">
                            {formData.nickname ? formData.nickname[0] : "U"}
                          </span>
                        </div>
                      )}
                    </div>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">昵称</Label>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="请输入昵称"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campus">选择校区</Label>
                    <Select value={formData.campus} onValueChange={(value) => handleInputChange('campus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择校区" />
                      </SelectTrigger>
                      <SelectContent>
                        {CAMPUS_OPTIONS.map((campus) => (
                          <SelectItem key={campus.value} value={campus.value}>
                            {campus.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    返回
                  </Button>
                  <Button
                    onClick={handleCompleteFirstLogin}
                    disabled={isLoading || !formData.nickname || !formData.campus}
                    className="flex-1"
                  >
                    {isLoading ? "保存中..." : "完成设置"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SigninForm; 