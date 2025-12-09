'use client';

import { Input } from '@/components/ui/input';
import { Facebook, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface LoginFormProps {
  onToggleForm: () => void;
}

export function LoginForm({ onToggleForm }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo login validation
    if (email === 'admin' && password === '123') {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use auth context to login (User role)
      login({
        id: '1',
        username: 'admin',
        email: 'admin@demo.com',
        name: 'Người Dùng',
        avatar: '👤',
        role: 'user',
      });
      
      // Redirect to home
      router.push('/');
    } else if (email === 'admin1' && password === '123') {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use auth context to login (Recruiter role)
      login({
        id: '2',
        username: 'admin1',
        email: 'admin1@demo.com',
        name: 'Nhà Tuyển Dụng',
        avatar: '🏢',
        role: 'recruiter',
      });
      
      // Redirect to home
      router.push('/');
    } else if (email.trim() === '' || password.trim() === '') {
      setError('Vui lòng nhập email/tên đăng nhập và mật khẩu');
      setIsLoading(false);
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác.\nDemo: admin/123 (Người dùng) hoặc admin1/123 (Nhà tuyển dụng)');
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <h1 
          className="text-xl sm:text-2xl font-black bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}
        >
          Trở lại và tiếp tục tiến bước
        </h1>
        <p 
          className="text-gray-400 text-xs sm:text-sm leading-relaxed"
          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
        >
          Nhập thông tin đăng nhập để tiếp tục hành trình của bạn
        </p>
      </motion.div>

      {/* Form Fields */}
      <motion.div className="space-y-4" variants={itemVariants}>
        {/* Error Message */}
        {error && (
          <motion.div
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            {error}
          </motion.div>
        )}

        {/* Email Input */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label 
            className="text-sm font-semibold text-gray-300"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
          >
            Email hoặc Số điện thoại
          </label>
          <motion.div
            whileFocus="focus"
            className="relative group"
          >
            <Input
              type="text"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/40 rounded-xl text-white placeholder:text-gray-400 transition-all duration-300 focus:border-cyan-400 focus:bg-linear-to-r focus:from-cyan-500/20 focus:to-purple-500/20 focus:shadow-lg focus:shadow-cyan-500/20 disabled:opacity-50"
              style={{ fontFamily: "'Poppins Regular', sans-serif" }}
            />
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 20px rgba(34, 211, 238, 0.1)',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Password Input */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label 
            className="text-sm font-semibold text-gray-300"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
          >
            Mật khẩu
          </label>
          <motion.div className="relative group">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/40 rounded-xl text-white placeholder:text-gray-400 pr-12 transition-all duration-300 focus:border-cyan-400 focus:bg-linear-to-r focus:from-cyan-500/20 focus:to-purple-500/20 focus:shadow-lg focus:shadow-cyan-500/20 disabled:opacity-50"
              style={{ fontFamily: "'Poppins Regular', sans-serif" }}
            />
            <motion.button
              type="button"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-300 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </motion.button>
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 20px rgba(34, 211, 238, 0.1)',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Forgot Password */}
        <motion.div className="flex justify-end pt-1" variants={itemVariants}>
          <motion.button
            className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors font-medium"
            style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
            whileHover={{ x: 2 }}
            whileTap={{ x: -2 }}
          >
            Quên mật khẩu?
          </motion.button>
        </motion.div>

        {/* Login Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
            whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative">{isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}</span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div className="relative my-6" variants={itemVariants}>
          <div className="absolute inset-0 flex items-center">
            <motion.div className="w-full border-t border-cyan-400/20" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-sm text-gray-400" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
              Hoặc tiếp tục với
            </span>
          </div>
        </motion.div>

        {/* Social Buttons */}
        <motion.div className="grid grid-cols-2 gap-2 sm:gap-4" variants={itemVariants}>
          <motion.button
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 rounded-xl text-gray-300 hover:text-cyan-300 transition-all duration-300 group"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              backgroundColor: 'rgba(34, 211, 238, 0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook className="w-5 h-5" />
            <span className="text-sm font-semibold">Facebook</span>
          </motion.button>
          <motion.button
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 rounded-xl text-gray-300 hover:text-cyan-300 transition-all duration-300 group"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              backgroundColor: 'rgba(34, 211, 238, 0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm font-semibold">Google</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Toggle to Register */}
      <motion.div className="text-center pt-2" variants={itemVariants}>
        <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
          Bạn chưa có tài khoản?{' '}
          <motion.button
            onClick={onToggleForm}
            className="text-cyan-300 font-bold hover:text-cyan-200 transition-colors"
            style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng ký tại đây
          </motion.button>
        </p>
      </motion.div>
    </motion.div>
  );
}
