import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-black p-8">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
            <span className="text-xl font-bold text-white">YT</span>
          </div>
          <h1 className="text-3xl font-bold text-white">YouTube Summarizer</h1>
          <p className="text-gray-400">Get AI-powered summaries of YouTube videos</p>
        </div>

        <div className="mt-8 space-y-6">
          <Link href="/dashboard" className="block w-full">
            <button className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-600 bg-black px-4 py-2 text-white transition hover:bg-gray-900">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Sign in with Google
            </button>
          </Link>

          <p className="text-center text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
