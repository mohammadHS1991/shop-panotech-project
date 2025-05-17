import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { User } from "@/app/[lang]/models";
import { recaptchaServerValidation } from "@/app/[lang]/utils";

export const authOptions = {
  // *----------------------------providers

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      // *----------------------------authorize function
      async authorize(credentials, req) {
        try {
          //? check recaptcha value with api
          const captchaResponse = await recaptchaServerValidation(
            process.env.CAPTCHA_SECRET_KEY,
            credentials.recaptcha
          );

          if (captchaResponse.success) {
            await panotechDBConnect();
            const user = await User.findOne({ email: credentials.email });

            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (credentials?.email === user?.email && isPasswordCorrect) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          // console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          mobile: token.mobile,
          role: token.role,
        },
      };
    },
  },

  pages: {
    signIn: "/login",
  },
};
