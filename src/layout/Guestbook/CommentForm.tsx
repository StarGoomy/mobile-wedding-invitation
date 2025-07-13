import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { push, ref, serverTimestamp, runTransaction, onValue } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';
import JSConfetti from 'js-confetti';
import data from 'data.json';



// TODO: 방명록 기능 사용시, realtime db에 guestbook 추가
const guestbookRef = ref(realtimeDb, 'guestbook');
const likesRef = ref(realtimeDb, 'likes/count');
const jsConfetti = new JSConfetti();

const CommentForm = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const { emojis } = data;

  useEffect(() => {
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const value = snapshot.val();
      setLikes(value ?? 0);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!name || !message) {
      alert('이름과 메시지를 채워주세요. 🥹');
    } else {
      e.preventDefault();
      // TODO: 이름, 메시지, 생성시간, 작성날짜 저장.
      const guestbookMessage = {
        sender: name,
        message: message,
        createdAt: serverTimestamp(),
        date: new Date().toLocaleString(),
      };
      void push(guestbookRef, guestbookMessage);
      
      alert('소중한 메시지 감사합니다❤️\n아래 축하해요 버튼을 누르고 초콜릿을 찾아보세요~🍫');
      setName('');
      setMessage('');
    }
  };

  const handleLike = () => {
    void jsConfetti.addConfetti({ emojis, confettiNumber: 1, emojiSize: 70 });
    runTransaction(likesRef, (current) => (current || 0) + 1);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <NameInput
        placeholder="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MessageInput
        placeholder="메시지"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SubmitButton type="submit">등록</SubmitButton>
      <LikeButton type="button" onClick={handleLike}>
        ❤️ 축하해요~ ❤️<br />많은 하객분들로부터 {likes} 번 축하 받았습니다.
      </LikeButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: visible;
  align-items: center;
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1;
  outline: none;
  border: 1px solid #ccc;
  font-family: inherit;
  font-weight: 300;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-weight: 300;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  background-color: white;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
`;

const LikeButton = styled.button`
  margin-top: 12px;
  background: #ffe3e3;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #ffcad4;
  }
`;

export default CommentForm;
