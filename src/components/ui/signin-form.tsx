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

// Campus data
const CAMPUS_OPTIONS = [
  { value: 'hku', label: 'The University of Hong Kong (HKU)' },
  { value: 'cuhk', label: 'The Chinese University of Hong Kong' },
  { value: 'ust', label: 'The Hong Kong University of Science and Technology' },
  { value: 'polyu', label: 'The Hong Kong Polytechnic University' },
  { value: 'cityu', label: 'City University of Hong Kong' },
];

// Login method enum
enum LoginMethod {
  PHONE = 'phone',
  EMAIL = 'email',
}

// Login step enum
enum LoginStep {
  INPUT_INFO = 'input_info',
  VERIFY_CODE = 'verify_code',
  FIRST_LOGIN = 'first_login',
}

const SigninForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(LoginMethod.PHONE);
  const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.INPUT_INFO);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Form data
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    verificationCode: '',
    nickname: '',
    avatar: '',
    campus: '',
  });

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Send verification code
  const handleSendCode = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Please agree to terms first",
        description: "Please check the terms of service before continuing",
        variant: "destructive",
      });
      return;
    }

    const contact = loginMethod === LoginMethod.PHONE ? formData.phone : formData.email;
    
    if (!contact) {
      toast({
        title: "Please enter contact information",
        description: loginMethod === LoginMethod.PHONE ? "Please enter phone number" : "Please enter email",
        variant: "destructive",
      });
      return;
    }

    // Validate format
    if (loginMethod === LoginMethod.PHONE && !/^1[3-9]\d{9}$/.test(contact)) {
      toast({
        title: "Invalid phone number format",
        description: "Please enter a valid 11-digit phone number",
        variant: "destructive",
      });
      return;
    }

    if (loginMethod === LoginMethod.EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code sent",
        description: `Code sent to your ${loginMethod === LoginMethod.PHONE ? 'phone' : 'email'}`,
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
        title: "Send failed",
        description: "Failed to send verification code, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify verification code
  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      toast({
        title: "Please enter verification code",
        description: "Please enter the code you received",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate verification code validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate first login check
      const isFirstLogin = Math.random() > 0.5; // Randomly simulate first login
      
      if (isFirstLogin) {
        setCurrentStep(LoginStep.FIRST_LOGIN);
      } else {
        // Direct login success
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Incorrect verification code, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Complete first login setup
  const handleCompleteFirstLogin = async () => {
    if (!formData.nickname || !formData.campus) {
      toast({
        title: "Please complete information",
        description: "Please fill in nickname and select campus",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate saving user information
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Setup completed",
        description: "Welcome to campus social!",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Setup failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep === LoginStep.VERIFY_CODE) {
      setCurrentStep(LoginStep.INPUT_INFO);
      setFormData(prev => ({ ...prev, verificationCode: '' }));
    } else if (currentStep === LoginStep.FIRST_LOGIN) {
      setCurrentStep(LoginStep.VERIFY_CODE);
    }
  };

  // Handle avatar upload
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
            Campus Social
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect campus, share life
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === LoginStep.INPUT_INFO && "Login"}
              {currentStep === LoginStep.VERIFY_CODE && "Verify Code"}
              {currentStep === LoginStep.FIRST_LOGIN && "Complete Profile"}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === LoginStep.INPUT_INFO && "Choose login method"}
              {currentStep === LoginStep.VERIFY_CODE && "Enter the verification code you received"}
              {currentStep === LoginStep.FIRST_LOGIN && "Please complete your profile information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input information step */}
            {currentStep === LoginStep.INPUT_INFO && (
              <>
                <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as LoginMethod)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={LoginMethod.PHONE}>Phone Login</TabsTrigger>
                    <TabsTrigger value={LoginMethod.EMAIL}>Email Login</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={LoginMethod.PHONE} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={LoginMethod.EMAIL} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">School Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your school email"
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
                    I have read and agree to the
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>
                  </Label>
                </div>

                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || !agreedToTerms}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </>
            )}

            {/* Verification code step */}
            {currentStep === LoginStep.VERIFY_CODE && (
              <>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Verification code sent to
                      <span className="font-medium">
                        {loginMethod === LoginMethod.PHONE ? formData.phone : formData.email}
                      </span>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="Enter verification code"
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
                    Back
                  </Button>
                  <Button
                    onClick={handleVerifyCode}
                    disabled={isLoading || !formData.verificationCode}
                    className="flex-1"
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>
                </div>

                {countdown > 0 && (
                  <p className="text-center text-sm text-gray-500">
                    Resend available in {countdown} seconds
                  </p>
                )}
              </>
            )}

            {/* First login setup step */}
            {currentStep === LoginStep.FIRST_LOGIN && (
              <>
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Label htmlFor="avatar">Avatar</Label>
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-gray-300">
                      {formData.avatar ? (
                        <img 
                          src={formData.avatar} 
                          alt="Avatar" 
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
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="Enter your nickname"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campus">Select Campus</Label>
                    <Select value={formData.campus} onValueChange={(value) => handleInputChange('campus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select campus" />
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
                    Back
                  </Button>
                  <Button
                    onClick={handleCompleteFirstLogin}
                    disabled={isLoading || !formData.nickname || !formData.campus}
                    className="flex-1"
                  >
                    {isLoading ? "Saving..." : "Complete Setup"}
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