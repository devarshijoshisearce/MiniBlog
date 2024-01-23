export default function LoginPage() {
    return (
        <form className="login" action="/login" method="POST">
            <h1>Login</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )
}