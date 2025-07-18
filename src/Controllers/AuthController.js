const User = require('../Models/Auth.model.js');
const jwt = require('jsonwebtoken');
const signup = async(req,res)=>{
    const {username,password,email,role} = req.body;
    try{
        if(!username || !password || !email){ //if any field is empty
            return res.status(400).json({message: "All fields are required"});
        const existingUser = await User.findOne({email});
        
        if(existingUser){ // check if user already exist or not
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10); //hashing the password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,  // store hashed password
            role: role || 'user' 
        })
        await newUser.save(); // save the user to the database
        res.status(201).json({message: "Email sent Sucessfully"})
    }}catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate token for future authentication
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

    
    


