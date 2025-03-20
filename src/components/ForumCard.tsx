"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

type QuestionCardProps = {
  id: string;
  title: string;
  description: string;
  voteCount: number;
  commentCount: number;
  userVoted: boolean;
}

export default function QuestionCard({
                                       id,
                                       title,
                                       description,
                                       voteCount = 0,
                                       commentCount = 0,
                                       userVoted = false
                                     }: QuestionCardProps) {
  const router = useRouter();
  const [votes, setVotes] = useState(voteCount);
  const [liked, setLiked] = useState(userVoted);

  const handleVote = async () => {
    try {
      setVotes(liked ? votes - 1 : votes + 1);
      setLiked(!liked);

      const response = await fetch(`/api/questions/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote: !liked }),
      });

      if (!response.ok) {
        setVotes(liked ? votes : votes - 1);
        setLiked(liked);
        console.error('Failed to update vote');
      }

      router.refresh();
    } catch (error) {
      console.error('Error voting:', error);
      setVotes(liked ? votes : votes - 1);
      setLiked(liked);
    }
  };

  return (
      <div className="max-w-xl mx-auto p-6 bg-white border-t border-gray-700">
        <h2 className="text-sm font-bold mb-3 text-left">
          {title}
        </h2>
        <p className="text-black mb-4 text-xs text-left">
          {description}
        </p>
        <div className="flex items-center space-x-4">
          <button
              onClick={handleVote}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                  liked ? "bg-blue-100 text-blue-600" : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <span className="text-sm">{liked ? "🔼" : "⬆️"}</span>
            <span className="ml-2 text-gray-700 font-medium">{votes}</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg transition">
            <span className="text-sm">💬</span>
            <span className="ml-2 text-gray-700 font-medium">{commentCount}</span>
          </button>
          <button
              onClick={() => router.push(`/questions/${id}`)}
              className="ml-auto text-gray-500 hover:text-gray-700 active:text-gray-900 transition"
          >
            ↗️
          </button>
        </div>
      </div>
  );
}