const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    geminiApiKey: { type: String, required: false },
    linkedInAccessToken: { type: String, required: false },
    linkedInRefreshToken: { type: String, required: false },
    linkedInId: { type: String, required: false },
    tokenExpiresAt: { type: Date, required: false }
  });
  
  const User = mongoose.model('User', userSchema);