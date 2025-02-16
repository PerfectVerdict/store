import jwt from 'jsonwebtoken'

const generateToken = (res, userId) = {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}
// set JWT as an HTTP-Only Cooke
res.cokie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development'
})
// 27:48
// https://www.youtube.com/watch?v=KXzc-fTFIRE&list=PLSDeUiTMfxW5ymcWAXlbnJ3KLoN34Li_C&index=3