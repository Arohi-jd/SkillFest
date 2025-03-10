'use client';

import { useSession } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";
import { LoginPopup } from "@/components/login-popup";
import { useState } from "react";
import { useRouter } from "next/navigation";

type TrackOptionProps = {
  title: string;
  description: string;
  color: string;
  selected: boolean;
  onClick: () => void;
};

function TrackOption({ title, description, color, selected, onClick }: TrackOptionProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        selected 
          ? `border-[${color}] bg-[${color}]/10` 
          : 'border-[#30363d] hover:border-[#8b949e]'
      }`}
    >
      <div className="flex items-center gap-3">
        <input 
          type="radio"
          checked={selected}
          onChange={() => {}}
          className="mt-1.5"
          style={{ accentColor: color }}
        />
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-sm text-[#8b949e]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const { data: session, status } = useSession();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedRole) {
      alert("Please select a role to continue");
      return;
    }

    switch (selectedRole) {
      case "Developer Role":
        router.push("/skillfest");
        break;
      case "Creative Lead Role":
        router.push("/creative");
        break;
      case "UI/UX Designer Role":
        router.push("/design");
        break;
      default:
        router.push("/register");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Join Our Team</h1>
            <p className="text-[#8b949e]">Select your role and start your journey with us</p>
          </div>

          {status === 'loading' ? (
            <div className="text-center text-[#8b949e]">Loading...</div>
          ) : !session ? (
            <div className="text-center">
              <p className="text-[#8b949e] mb-4">Please sign in to continue</p>
              <SignInButton />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]">
                <h2 className="text-xl font-semibold mb-4 text-white">Welcome, {session.user?.name}</h2>
                <p className="text-[#8b949e] mb-6">Select your preferred role in the club.</p>
                
                <div className="space-y-4">
                  <TrackOption
                    title="Developer Role"
                    description="Join our development team and build amazing projects"
                    color="#238636"
                    selected={selectedRole === "Developer Role"}
                    onClick={() => setSelectedRole("Developer Role")}
                  />
                  <TrackOption
                    title="UI/UX Designer Role"
                    description="Create beautiful and intuitive user experiences"
                    color="#A371F7"
                    selected={selectedRole === "UI/UX Designer Role"}
                    onClick={() => setSelectedRole("UI/UX Designer Role")}
                  />
                  <TrackOption
                    title="Creative Lead Role"
                    description="Lead our creative initiatives and branding"
                    color="#F778BA"
                    selected={selectedRole === "Creative Lead Role"}
                    onClick={() => setSelectedRole("Creative Lead Role")}
                  />
                </div>

                <button 
                  onClick={handleContinue}
                  className={`w-full mt-6 py-3 rounded-lg transition-colors ${
                    selectedRole 
                      ? 'bg-[#238636] hover:bg-[#2ea043] text-white cursor-pointer' 
                      : 'bg-[#238636]/50 text-white/50 cursor-not-allowed'
                  }`}
                  disabled={!selectedRole}
                >
                  Continue Application
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
} 