document
.getElementById("btnGenerar")
.addEventListener("click", generarPDF);

function actualizarConsecutivo(){

```
let numero =
    parseInt(
        localStorage.getItem("contadorPDF")
    ) || 1;

document.getElementById(
    "consecutivoActual"
).innerText =
    "N" +
    String(numero).padStart(4,"0");
```

}

function obtenerConsecutivo(){

```
let numero =
    parseInt(
        localStorage.getItem("contadorPDF")
    ) || 1;

localStorage.setItem(
    "contadorPDF",
    numero + 1
);

return "N" +
    String(numero).padStart(4,"0");
```

}

function leerImagen(input){

```
return new Promise((resolve)=>{

    if(!input.files.length){
        resolve(null);
        return;
    }

    const reader =
        new FileReader();

    reader.onload =
    function(e){
        resolve(
            e.target.result
        );
    };

    reader.readAsDataURL(
        input.files[0]
    );
});
```

}

async function generarPDF(){

```
try{

    const { jsPDF } =
        window.jspdf;

    const pdf =
        new jsPDF();

    const consecutivo =
        obtenerConsecutivo();

    actualizarConsecutivo();

    const ahora =
        new Date();

    const fechaActual =
        ahora.toLocaleDateString();

    const horaActual =
        ahora.toLocaleTimeString();

    const fotoGeneral =
        await leerImagen(
            document.getElementById("fotoGeneral")
        );

    const fotoInicial =
        await leerImagen(
            document.getElementById("fotoInicial")
        );

    const fotoIntervencion =
        await leerImagen(
            document.getElementById("fotoIntervencion")
        );

    const fotoFinal =
        await leerImagen(
            document.getElementById("fotoFinal")
        );

    let y = 20;

    pdf.setFontSize(22);

    pdf.text(
        "GUIA DE MANTENIMIENTO",
        105,
        y,
        {align:"center"}
    );

    y += 12;

    pdf.setFontSize(16);

    pdf.text(
        consecutivo,
        105,
        y,
        {align:"center"}
    );

    y += 15;

    pdf.setFontSize(12);

    pdf.text(
        `Fecha: ${fechaActual}`,
        15,
        y
    );

    y += 8;

    pdf.text(
        `Hora: ${horaActual}`,
        15,
        y
    );

    y += 8;

    pdf.text(
        `Tecnico: ${document.getElementById("tecnico").value}`,
        15,
        y
    );

    y += 8;

    pdf.text(
        `Tipo mantenimiento: ${document.getElementById("tipoMantenimiento").value}`,
        15,
        y
    );

    y += 8;

    pdf.text(
        `Tipo maquina: ${document.getElementById("tipoMaquina").value}`,
        15,
        y
    );

    y += 8;

    pdf.text(
        `Equipo: ${document.getElementById("nombreEquipo").value}`,
        15,
        y
    );

    y += 8;

    pdf.text(
        `Serie: ${document.getElementById("serie").value}`,
        15,
        y
    );

    y += 15;

    pdf.setFontSize(14);
    pdf.text("ESTADO INICIAL",15,y);

    y += 8;

    pdf.setFontSize(11);

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("estadoInicial").value,
            170
        ),
        15,
        y
    );

    y += 20;

    if(fotoInicial){

        pdf.addImage(
            fotoInicial,
            "JPEG",
            35,
            y,
            140,
            100
        );

        y += 110;
    }

    if(y > 230){
        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);
    pdf.text("INTERVENCION",15,y);

    y += 8;

    pdf.setFontSize(11);

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("intervencion").value,
            170
        ),
        15,
        y
    );

    y += 20;

    if(fotoIntervencion){

        pdf.addImage(
            fotoIntervencion,
            "JPEG",
            35,
            y,
            140,
            100
        );

        y += 110;
    }

    if(y > 230){
        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);
    pdf.text("ESTADO FINAL",15,y);

    y += 8;

    pdf.setFontSize(11);

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("estadoFinal").value,
            170
        ),
        15,
        y
    );

    y += 20;

    if(fotoFinal){

        pdf.addImage(
            fotoFinal,
            "JPEG",
            35,
            y,
            140,
            100
        );

        y += 110;
    }

    if(y > 230){
        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);
    pdf.text("OBSERVACIONES",15,y);

    y += 8;

    pdf.setFontSize(11);

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("observaciones").value,
            170
        ),
        15,
        y
    );

    y += 20;

    if(fotoGeneral){

        pdf.setFontSize(14);

        pdf.text(
            "FOTO GENERAL",
            15,
            y
        );

        y += 10;

        pdf.addImage(
            fotoGeneral,
            "JPEG",
            35,
            y,
            140,
            100
        );
    }

    pdf.save(
        `${consecutivo}_Guia_Mantenimiento.pdf`
    );

}catch(error){

    alert(
        "Error generando PDF"
    );

    console.error(error);
}
```

}

actualizarConsecutivo();
