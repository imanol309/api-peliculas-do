const btnEliminar = document.querySelector("#btn-canturrador");

btnEliminar.addEventListener("click", async () => {
  console.log(`Me diste click, elimina`);
  const id = btnEliminar.dataset.btn;
  try {
    const data = await fetch(`/Mascotas/${id}`, {
        method: `delete`
    });
    const res =  await data.json()
    console.log(res);
    if (res.estado) {
        window.location.href = `/mascotas`
    } else {
        console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
});
