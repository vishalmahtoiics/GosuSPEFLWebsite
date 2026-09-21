import { sql } from "../sql.js";
import { neonCredentialsRepo } from "./neonCredentialsRepo.js";
import { neonProfilesRepo } from "./neonProfilesRepo.js";
import { neonAuthTokensRepo } from "./neonAuthTokensRepo.js";
import { neonContactMessagesRepo } from "./neonContactMessagesRepo.js";
import type { CredentialsRepo } from "./credentials.js";
import type { ProfilesRepo } from "./profiles.js";
import type { AuthTokensRepo } from "./authTokens.js";
import type { ContactMessagesRepo } from "./contactMessages.js";

export const credentialsRepo = (): CredentialsRepo => neonCredentialsRepo(sql);
export const profilesRepo = (): ProfilesRepo => neonProfilesRepo(sql);
export const authTokensRepo = (): AuthTokensRepo => neonAuthTokensRepo(sql);
export const contactMessagesRepo = (): ContactMessagesRepo => neonContactMessagesRepo(sql);
