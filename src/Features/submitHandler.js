function submitHdl(email, password, setPopup, setPopupError) {
  return (e) => {
    e.preventDefault();

    fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setPopup(true);
        }
      })
      .catch((err) => {
        if (err) {
          setPopupError(true);
        }
      });
  };
}

export default submitHdl;
