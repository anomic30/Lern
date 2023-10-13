import { createUser, loginUser, validateEmail } from "../services/auth.js";
import { catchAsync } from "../utils/catchAsync.js";
import magic from "../utils/magic.cjs";

export const register = catchAsync(async (req, res) => {
  try {
    const { email, userName } = req.body;
    if (!email || !userName) {
      return res.status(400).send("Email and username are required");
    }
    const user = await createUser(email, userName);
    return res.status(201).send("User created successfully");
  } catch (error) {
    console.error("❌ Error inside register controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const checkUser = catchAsync(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    const found = await validateEmail(email);
    if (!found) {
      return res.status(200).json({ status: false });
    }
    return res.status(200).json({ status: true });
  } catch (error) {
    console.error("❌ Error inside checkUser controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const login = catchAsync(async (req, res) => {
  try {
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);
    console.log("User is authenticated");
    const issuer = await magic.token.getIssuer(didToken);
    console.log(issuer);
    const user = await loginUser(req.body.email, issuer);
    const metadata = await magic.users.getMetadataByIssuer(issuer);

    return res.status(200).json({
      authenticated: true,
      metadata,
      user
    });
  } catch (error) {
    console.error("❌ Error inside login controller:", error);
    return res.status(500).json({ error: error });
  }
});