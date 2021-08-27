import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import {useRouter} from 'next/router';
import '../../components/fire';

const db = firebase.firestore();
const auth = firebase.auth();

export default function Home() {
  const [message, setMessage] = useState('add address');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [tel, setTel] = useState('');
  const [memo, setMemo] = useState('');
  const router = useRouter();

  // ログインしていなければトップページに戻る
  useEffect(() => {
    if (auth.currentUser == null) {
      route.push('/address');
    }
  }, []);

  // name, mail, tel, memo の入力処理
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeMail = (e) => {
    setMail(e.target.value);
  };
  const onChangeTel = (e) => {
    setTel(e.target.value);
  };
  const onChangeMemo = (e) => {
    setMemo(e.target.value);
  };

  // アドレスの登録
  const doAction = (e) => {
    const ob = {
      name: name,
      mail: mail,
      tel: tel,
      memo: memo,
      flag: false,
    };
    db.collection('address')
      .doc(auth.currentUser.email)
      .collection('address')
      .doc(mail)
      .set(ob)
      .then((ref) => {
        router.push('/address');
      });
  };

  // ドップページに戻る
  const goBack = (e) => {
    router.push('/address');
  };

  return (
    <div>
      <Layout header="Next.js" title="Create data.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" onChange={onChangeName} className="form-control" />
            </div>
            <div className="form-group">
              <label>Mail:</label>
              <input type="text" onChange={onChangeMail} className="form-control" />
            </div>
            <div className="form-group">
              <label>Tel:</label>
              <input type="text" onChange={onChangeTel} className="form-control" />
            </div>
            <div className="form-group">
              <label>Memo:</label>
              <input type="text" onChange={onChangeMemo} className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Add
          </button>
          <button onClick={goBack} className="btn">
            Go Back
          </button>
        </div>
      </Layout>
    </div>
  );
}
