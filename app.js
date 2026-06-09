document
.getElementById("btnGenerar")
.addEventListener("click", generarPDF);


function obtenerConsecutivo() {

    let numero =
        parseInt(
            localStorage.getItem("contadorPDF")
        ) || 1;

    localStorage.setItem(
        "contadorPDF",
        numero + 1
    );

    return "N" +
        String(numero).padStart(4, "0");
}


function leerImagen(input) {

    return new Promise((resolve) => {

        if (!input.files.length) {

            resolve(null);
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {

            resolve(
                e.target.result
            );
        };

        reader.readAsDataURL(
            input.files[0]
        );
    });
}


async function generarPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const consecutivo =
        obtenerConsecutivo();

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

    pdf.setFontSize(20);

    pdf.text(
        "GUIA DE MANTENIMIENTO",
        105,
        y,
        { align: "center" }
    );

    y += 10;

    pdf.setFontSize(14);

    pdf.text(
        consecutivo,
        105,
        y,
        { align: "center" }
    );

    y += 15;

    pdf.setFontSize(12);

    pdf.text(
        `Fecha: ${document.getElementById("fecha").value}`,
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

    pdf.text(
        "ESTADO INICIAL",
        15,
        y
    );

    y += 8;

    pdf.setFontSize(11);

    let textoInicial =
        pdf.splitTextToSize(
            document.getElementById("estadoInicial").value,
            170
        );

    pdf.text(
        textoInicial,
        15,
        y
    );

    y += (textoInicial.length * 6) + 5;

    if (fotoInicial) {

        pdf.addImage(
            fotoInicial,
            "JPEG",
            15,
            y,
            80,
            60
        );

        y += 70;
    }

    if (y > 230) {

        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);

    pdf.text(
        "INTERVENCION",
        15,
        y
    );

    y += 8;

    pdf.setFontSize(11);

    let textoIntervencion =
        pdf.splitTextToSize(
            document.getElementById("intervencion").value,
            170
        );

    pdf.text(
        textoIntervencion,
        15,
        y
    );

    y += (textoIntervencion.length * 6) + 5;

    if (fotoIntervencion) {

        pdf.addImage(
            fotoIntervencion,
            "JPEG",
            15,
            y,
            80,
            60
        );

        y += 70;
    }

    if (y > 230) {

        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);

    pdf.text(
        "ESTADO FINAL",
        15,
        y
    );

    y += 8;

    pdf.setFontSize(11);

    let textoFinal =
        pdf.splitTextToSize(
            document.getElementById("estadoFinal").value,
            170
        );

    pdf.text(
        textoFinal,
        15,
        y
    );

    y += (textoFinal.length * 6) + 5;

    if (fotoFinal) {

        pdf.addImage(
            fotoFinal,
            "JPEG",
            15,
            y,
            80,
            60
        );

        y += 70;
    }

    if (y > 230) {

        pdf.addPage();
        y = 20;
    }

    pdf.setFontSize(14);

    pdf.text(
        "OBSERVACIONES",
        15,
        y
    );

    y += 8;

    pdf.setFontSize(11);

    let observaciones =
        pdf.splitTextToSize(
            document.getElementById("observaciones").value,
            170
        );

    pdf.text(
        observaciones,
        15,
        y
    );

    y += (observaciones.length * 6) + 10;

    if (fotoGeneral) {

        if (y > 180) {

            pdf.addPage();
            y = 20;
        }

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
            15,
            y,
            120,
            90
        );
    }

    pdf.save(
        `${consecutivo}_Guia_Mantenimiento.pdf`
    );
}