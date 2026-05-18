import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PersonalityProfile } from "@/types/personality";
import { PersonalityService } from "@/services/personality";

/**
 * usePersonalityProfile handles the lifecycle of fetching and managing
 * the user's personality analysis data.
 */
export function usePersonalityProfile() {
  const { status } = useSession();
  const [profile, setProfile] = useState<PersonalityProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      loadProfile();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await PersonalityService.getProfile();
      setProfile(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading your profile.");
    } finally {
      setLoading(false);
    }
  }

  return {
    profile,
    error,
    loading,
    status,
    refresh: loadProfile
  };
}
