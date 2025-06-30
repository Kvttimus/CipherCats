"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Sparkles, Code, Terminal } from "lucide-react"
import { UserAuth } from "@/context/AuthContext"

// Style constants for better maintainability
const STYLES = {
    // Colors
    colors: {
        primary: {
            red: 'red-500',
            redDark: 'red-600',
            redLight: 'red-400',
            green: 'green-500',
            greenDark: 'green-600',
            greenLight: 'green-400',
            cyan: 'cyan-500',
            cyanLight: 'cyan-400',
        },
        neutral: {
            slate300: 'slate-300',
            slate400: 'slate-400',
            slate500: 'slate-500',
            slate700: 'slate-700',
            white: 'white',
            black: 'black',
        }
    },

    // Dimensions
    dimensions: {
        cardWidth: '500px',
        cardMinHeight: '500px',
        inputWidth: 350,
        inputHeight: 50,
        buttonHeight: 56, // h-14
        iconSize: 'w-4 h-4',
        iconSizeMd: 'w-5 h-5',
        iconSizeLg: 'w-7 h-7',
        logoSize: 'w-14 h-14',
    },

    // Common class combinations
    common: {
        fontMono: 'font-mono',
        fontBold: 'font-bold',
        fontSemibold: 'font-semibold',
        roundedXl: 'rounded-xl',
        roundedLg: 'rounded-lg',
        transition: 'transition-all duration-300',
        backdrop: 'backdrop-blur-sm',
        glassmorphism: 'bg-black/50 border-2 border-slate-700',
        hoverScale: 'transform hover:scale-105',
    }
}

// Reusable style classes
const styleClasses = {
    // Background and layout
    pageBackground: `min-h-screen relative overflow-hidden flex items-center justify-center`,

    // Card styles
    authCard: `${STYLES.common.roundedXl} border border-white/20 shadow-2xl`,

    // Button styles
    primaryButton: `w-full bg-gradient-to-r from-${STYLES.colors.primary.redDark} to-${STYLES.colors.primary.red} hover:from-${STYLES.colors.primary.red} hover:to-${STYLES.colors.primary.redLight} text-${STYLES.colors.neutral.white} ${STYLES.common.fontMono} ${STYLES.common.fontBold} ${STYLES.common.roundedXl} ${STYLES.common.transition} ${STYLES.common.hoverScale} shadow-lg shadow-${STYLES.colors.primary.red}/25 text-base`,

    secondaryButton: `w-full bg-gradient-to-r from-${STYLES.colors.primary.greenDark} to-${STYLES.colors.primary.cyan} hover:from-${STYLES.colors.primary.green} hover:to-${STYLES.colors.primary.cyanLight} text-${STYLES.colors.neutral.black} ${STYLES.common.fontMono} ${STYLES.common.fontBold} ${STYLES.common.roundedXl} ${STYLES.common.transition} ${STYLES.common.hoverScale} shadow-lg shadow-${STYLES.colors.primary.green}/25 text-base`,

    eyeButton: `bg-gradient-to-r from-${STYLES.colors.primary.redDark} to-${STYLES.colors.primary.red} hover:from-${STYLES.colors.primary.red} hover:to-${STYLES.colors.primary.redLight} text-${STYLES.colors.neutral.white} ${STYLES.common.fontMono} ${STYLES.common.fontBold} ${STYLES.common.roundedXl} ${STYLES.common.transition} ${STYLES.common.hoverScale} shadow-lg shadow-${STYLES.colors.primary.red}/25 text-base`,

    // Input styles
    input: `px-5 ${STYLES.common.glassmorphism} ${STYLES.common.roundedXl} text-${STYLES.colors.primary.greenLight} ${STYLES.common.fontMono} placeholder-${STYLES.colors.neutral.slate500} focus:border-${STYLES.colors.primary.green} focus:ring-2 focus:ring-${STYLES.colors.primary.green}/20 ${STYLES.common.transition} text-base`,

    // Label styles
    label: `text-${STYLES.colors.primary.greenLight} ${STYLES.common.fontMono} text-sm ${STYLES.common.fontSemibold} uppercase tracking-wider flex items-center gap-2`,

    // Tab styles
    tabsList: `grid w-full grid-cols-2 mb-10 p-1 bg-${STYLES.colors.neutral.black}/30 ${STYLES.common.backdrop} border border-white/10 ${STYLES.common.roundedXl} h-14`,

    tabTriggerBase: `py-3 px-6 ${STYLES.common.roundedLg} ${STYLES.common.fontMono} ${STYLES.common.fontSemibold} ${STYLES.common.transition} border border-transparent text-sm`,

    tabTriggerSignIn: `data-[state=active]:bg-${STYLES.colors.primary.red}/20 data-[state=active]:text-${STYLES.colors.primary.redLight} data-[state=active]:border-${STYLES.colors.primary.red}/50 text-${STYLES.colors.neutral.slate300}`,

    tabTriggerSignUp: `data-[state=active]:bg-${STYLES.colors.primary.green}/20 data-[state=active]:text-${STYLES.colors.primary.greenLight} data-[state=active]:border-${STYLES.colors.primary.green}/50 text-${STYLES.colors.neutral.slate300}`,

    // Error styles
    errorContainer: `bg-${STYLES.colors.primary.red}/10 border border-${STYLES.colors.primary.red}/30 ${STYLES.common.roundedXl} p-4 ${STYLES.common.backdrop}`,
    errorText: `text-${STYLES.colors.primary.redLight} text-sm text-center ${STYLES.common.fontMono}`,

    // Header styles
    logo: `${STYLES.dimensions.logoSize} bg-gradient-to-r from-${STYLES.colors.primary.red} to-${STYLES.colors.primary.redDark} ${STYLES.common.roundedXl} flex items-center justify-center shadow-lg shadow-${STYLES.colors.primary.red}/25`,
    title: `text-5xl ${STYLES.common.fontBold} text-${STYLES.colors.neutral.white} ${STYLES.common.fontMono} tracking-wider`,
    subtitle: `text-${STYLES.colors.neutral.slate300} text-xl mb-4`,

    // Form styles
    formContainer: `space-y-8 mt-0`,
    fieldContainer: `space-y-4`,
    inputContainer: `flex flex-col justify-center items-center space-y-4`,
    passwordContainer: `relative`,

    // Loading spinner
    spinner: `w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3`,
    spinnerDark: `w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3`,
}

// Inline styles for complex properties
const inlineStyles = {
    pageBackground: {
        background: "linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(27, 19, 19) 50%,rgb(0, 0, 0) 100%)",
    },
    authCard: {
        width: STYLES.dimensions.cardWidth,
        minHeight: STYLES.dimensions.cardMinHeight,
        backdropFilter: "blur(20px)",
    },
    input: {
        width: STYLES.dimensions.inputWidth,
        height: STYLES.dimensions.inputHeight,
    },
    matrixChar: (left: number, delay: number) => ({
        left: `${left}%`,
        animationDelay: `${delay}s`,
    }),
}

export default function AuthPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Sign In State
    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")
    const [signInError, setSignInError] = useState("")
    const [signInLoading, setSignInLoading] = useState(false)

    // Sign Up State
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const [signUpError, setSignUpError] = useState("")
    const [signUpLoading, setSignUpLoading] = useState(false)

    const { signInUser, signUpNewUser } = UserAuth()
    const navigate = useNavigate()

    // Matrix rain state
    const [matrixChars, setMatrixChars] = useState<Array<{ char: string; left: number; delay: number }>>([])

    useEffect(() => {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
        const newMatrixChars = Array.from({ length: 50 }, (_, i) => ({
            char: chars[Math.floor(Math.random() * chars.length)],
            left: Math.random() * 100,
            delay: Math.random() * 3,
        }))
        setMatrixChars(newMatrixChars)
    }, [])

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignInLoading(true)
        setSignInError("")

        try {
            const result = await signInUser(signInEmail, signInPassword)
            if (result.success) {
                navigate("/home")
            } else {
                setSignInError(result.error?.message || result.error || "Invalid credentials")
            }
        } catch (error: any) {
            setSignInError("Authentication failed")
        } finally {
            setSignInLoading(false)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignUpLoading(true)
        setSignUpError("")

        try {
            const result = await signUpNewUser(signUpEmail, signUpPassword)
            if (result.success) {
                navigate("/home")
            } else {
                setSignUpError(result.error?.message || result.error || "Registration failed")
            }
        } catch (error: any) {
            setSignUpError("Registration failed")
        } finally {
            setSignUpLoading(false)
        }
    }

    return (
        <div className={styleClasses.pageBackground} style={inlineStyles.pageBackground}>
            {/* Matrix Rain Background */}
            <div className="matrix-rain">
                {matrixChars.map((item, index) => (
                    <div
                        key={index}
                        className="matrix-char"
                        style={inlineStyles.matrixChar(item.left, item.delay)}
                    >
                        {item.char}
                    </div>
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className={styleClasses.logo}>
                            <Shield className={STYLES.dimensions.iconSizeLg + " text-white"} />
                        </div>
                        <h1 className={styleClasses.title}>CipherCats</h1>
                    </div>
                    <p className={styleClasses.subtitle}>Master cryptography through interactive learning</p>
                    <div className="flex items-center justify-center gap-3">
                        <div className={`w-3 h-3 bg-${STYLES.colors.primary.red} rounded-full animate-pulse`} />
                        <div className={`w-3 h-3 bg-${STYLES.colors.primary.green} rounded-full animate-pulse delay-200`} />
                        <div className={`w-3 h-3 bg-${STYLES.colors.primary.cyan} rounded-full animate-pulse delay-400`} />
                    </div>
                </div>

                {/* Glassmorphism Auth Card */}
                <div className={styleClasses.authCard} style={inlineStyles.authCard}>
                    <div />

                    {/* Card Content */}
                    <div className="relative z-10 p-10">
                        <Tabs defaultValue="signin" className="w-full">
                            {/* Tab Navigation */}
                            <TabsList className={styleClasses.tabsList}>
                                <TabsTrigger
                                    value="signin"
                                    className={`${styleClasses.tabTriggerBase} ${styleClasses.tabTriggerSignIn}`}
                                >
                                    <Terminal className={STYLES.dimensions.iconSize + " mr-2"} />
                                    SIGN IN
                                </TabsTrigger>
                                <TabsTrigger
                                    value="signup"
                                    className={`${styleClasses.tabTriggerBase} ${styleClasses.tabTriggerSignUp}`}
                                >
                                    <Sparkles className={STYLES.dimensions.iconSize + " mr-2"} />
                                    SIGN UP
                                </TabsTrigger>
                            </TabsList>

                            {/* Sign In Tab */}
                            <TabsContent value="signin" className={styleClasses.formContainer}>
                                <div className="text-center mb-8">
                                    <h2 className={`text-3xl ${STYLES.common.fontBold} text-${STYLES.colors.neutral.white} mb-3 ${STYLES.common.fontMono}`}>ACCESS TERMINAL</h2>
                                    <p className={`text-${STYLES.colors.neutral.slate400}`}>Initialize authentication protocol</p>
                                </div>

                                <form onSubmit={handleSignIn} className="space-y-8">
                                    <div className={styleClasses.fieldContainer}>
                                        <Label htmlFor="signin-email" className={styleClasses.label}>
                                            <Mail className={STYLES.dimensions.iconSize} />
                                            AGENT ID
                                        </Label>
                                        <div className={styleClasses.inputContainer}>
                                            <Input
                                                id="signin-email"
                                                type="email"
                                                placeholder="agent@ciphercats.net"
                                                value={signInEmail}
                                                onChange={(e) => setSignInEmail(e.target.value)}
                                                required
                                                className={styleClasses.input}
                                                style={inlineStyles.input}
                                            />
                                        </div>
                                    </div>

                                    <div className={styleClasses.fieldContainer}>
                                        <Label htmlFor="signin-password" className={styleClasses.label}>
                                            <Lock className={STYLES.dimensions.iconSize} />
                                            ACCESS KEY
                                        </Label>
                                        <div className={styleClasses.inputContainer}>
                                            <Input
                                                id="signin-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter cipher sequence"
                                                value={signInPassword}
                                                onChange={(e) => setSignInPassword(e.target.value)}
                                                required
                                                className={styleClasses.input}
                                                style={inlineStyles.input}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className={styleClasses.eyeButton}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className={`${STYLES.dimensions.iconSizeMd} text-${STYLES.colors.primary.greenLight}`} />
                                                ) : (
                                                    <Eye className={`${STYLES.dimensions.iconSizeMd} text-${STYLES.colors.primary.greenLight}`} />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {signInError && (
                                        <div className={styleClasses.errorContainer}>
                                            <p className={styleClasses.errorText}>ERROR: {signInError}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className={`${styleClasses.primaryButton} h-${STYLES.dimensions.buttonHeight / 4}`}
                                        disabled={signInLoading}
                                    >
                                        {signInLoading ? (
                                            <>
                                                <div className={styleClasses.spinner} />
                                                AUTHENTICATING...
                                            </>
                                        ) : (
                                            <>
                                                <Terminal className={STYLES.dimensions.iconSizeMd + " mr-3"} />
                                                INITIATE ACCESS
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="text-center">
                                    <Button
                                        variant="link"
                                        className={`text-${STYLES.colors.primary.cyanLight} hover:text-${STYLES.colors.primary.cyan}Light ${STYLES.common.fontMono} text-sm transition-colors`}
                                    >
                                        &gt; Forgot cipher key?
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Sign Up Tab */}
                            <TabsContent value="signup" className={styleClasses.formContainer}>
                                <div className="text-center mb-8">
                                    <h2 className={`text-3xl ${STYLES.common.fontBold} text-${STYLES.colors.neutral.white} mb-3 ${STYLES.common.fontMono}`}>AGENT REGISTRATION</h2>
                                    <p className={`text-${STYLES.colors.neutral.slate400}`}>Initialize new agent profile</p>
                                </div>

                                <form onSubmit={handleSignUp} className="space-y-8">
                                    <div className={styleClasses.fieldContainer}>
                                        <Label htmlFor="signup-email" className={styleClasses.label}>
                                            <Mail className={STYLES.dimensions.iconSize} />
                                            AGENT EMAIL
                                        </Label>
                                        <div className={styleClasses.inputContainer}>
                                            <Input
                                                id="signup-email"
                                                type="email"
                                                placeholder="newagent@ciphercats.net"
                                                value={signUpEmail}
                                                onChange={(e) => setSignUpEmail(e.target.value)}
                                                required
                                                className={styleClasses.input}
                                                style={inlineStyles.input}
                                            />
                                        </div>
                                    </div>

                                    <div className={styleClasses.fieldContainer}>
                                        <Label htmlFor="signup-password" className={styleClasses.label}>
                                            <Lock className={STYLES.dimensions.iconSize} />
                                            CREATE CIPHER
                                        </Label>
                                        <div className={styleClasses.inputContainer}>
                                            <Input
                                                id="signup-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Design encryption key"
                                                value={signUpPassword}
                                                onChange={(e) => setSignUpPassword(e.target.value)}
                                                required
                                                className={styleClasses.input}
                                                style={inlineStyles.input}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className={styleClasses.eyeButton}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className={`${STYLES.dimensions.iconSizeMd} text-${STYLES.colors.primary.greenLight}`} />
                                                ) : (
                                                    <Eye className={`${STYLES.dimensions.iconSizeMd} text-${STYLES.colors.primary.greenLight}`} />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {signUpError && (
                                        <div className={styleClasses.errorContainer}>
                                            <p className={styleClasses.errorText}>ERROR: {signUpError}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className={`${styleClasses.secondaryButton} h-${STYLES.dimensions.buttonHeight / 4}`}
                                        disabled={signUpLoading}
                                    >
                                        {signUpLoading ? (
                                            <>
                                                <div className={styleClasses.spinnerDark} />
                                                REGISTERING AGENT...
                                            </>
                                        ) : (
                                            <>
                                                <Shield className={STYLES.dimensions.iconSizeMd + " mr-3"} />
                                                JOIN THE MISSION
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <p className={`text-xs text-${STYLES.colors.neutral.slate400} text-center ${STYLES.common.fontMono}`}>
                                    By registering, you agree to decrypt the matrix
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-8">
                    <p className={`text-${STYLES.colors.primary.greenLight} ${STYLES.common.fontMono} text-lg`}>
                        <span className="animate-pulse">&gt;</span> Ready to become a cryptography master?
                        <span className="animate-pulse ml-1">_</span>
                    </p>
                </div>
            </div>
        </div>
    )
}