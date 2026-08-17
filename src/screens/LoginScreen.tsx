import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, AlertCircle, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ClinovaLogo from '../components/ClinovaLogo'
import { InlineLoader } from '../components/PageLoader'

export default function LoginScreen() {
  const { loginWithGoogle, loginWithEmail, signUpWithEmail, userData } = useAuth()
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  React.useEffect(() => {
    if (userData) {
      navigate('/', { replace: true })
    }
  }, [userData, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name)
      } else {
        await loginWithEmail(email, password)
      }
      navigate('/', { replace: true })
    } catch (err: any) {
      console.error(err)
      let friendlyMessage = err?.message || 'Authentication failed. Please check your details.'
      if (err?.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already registered. Please sign in instead.'
      } else if (err?.code === 'auth/weak-password') {
        friendlyMessage = 'Password must be at least 6 characters.'
      } else if (
        err?.code === 'auth/invalid-credential' ||
        err?.code === 'auth/user-not-found' ||
        err?.code === 'auth/wrong-password'
      ) {
        friendlyMessage = 'Incorrect email or password.'
      } else if (err?.code === 'auth/invalid-email') {
        friendlyMessage = 'Please enter a valid email address.'
      }
      setErrorMsg(friendlyMessage)
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setErrorMsg(null)
    try {
      await loginWithGoogle()
      navigate('/', { replace: true })
    } catch (err: any) {
      console.error(err)
      let errMsg =
        'Google sign-in failed. Please use Email/Password or the Quick Demo Sign-In below.'
      if (err?.code === 'auth/unauthorized-domain') {
        errMsg =
          'Google Sign-in is currently unavailable in this environment. Please use standard Email/Password or click "Quick Demo Sign-In" below.'
      } else if (err?.code === 'auth/popup-blocked') {
        errMsg = 'The sign-in popup was blocked. Please allow popups or try the Quick Demo Sign-In.'
      }
      setErrorMsg(errMsg)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-4 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Logo and Greeting */}
        <div className="p-6 sm:p-8 pb-4 text-center bg-gradient-to-b from-[var(--primary-container)]/30 to-transparent">
          <div className="flex justify-center mb-4 drop-shadow-md">
            <ClinovaLogo size={56} variant="colored" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {isSignUp
              ? 'Sign up to create your clinical portal account'
              : 'Sign in to access your secure workspace'}
          </p>
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
          {errorMsg && (
            <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-700 dark:text-red-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            {isSignUp && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text)] block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text)] block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text)] block">Password</label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <InlineLoader size={16} />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Switch Toggle */}
          <div className="text-center mb-5">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setErrorMsg(null)
              }}
              className="text-xs text-[var(--primary)] hover:underline font-medium cursor-pointer"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          {/* Separator */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[var(--border)]"></div>
            <span className="flex-shrink mx-4 text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-[var(--border)]"></div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 bg-[var(--surface-dim)] border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text)] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--surface-dim)]/50 border-t border-[var(--border)] text-center text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1.5">
          <Shield size={12} className="text-[var(--primary)] shrink-0" /> Secure and encrypted
          clinical workspace.
        </div>
      </div>
    </div>
  )
}
