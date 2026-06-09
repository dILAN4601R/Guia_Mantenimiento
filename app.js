document
.getElementById("btnGenerar")
.addEventListener("click", generarPDF);

function leerImagen(input) {
    return new Promise((resolve) => {

        if (!input.files.length) {
            resolve(null);
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            resolve(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    });
}

async function generarPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    let y = 15;

    pdf.setFontSize(18);
    pdf.text("GUIA DE MANTENIMIENTO", 15, y);

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

    pdf.text("Estado Inicial:", 15, y);

    y += 7;

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("estadoInicial").value,
            170
        ),
        15,
        y
    );

    y += 25;

    pdf.text("Intervencion:", 15, y);

    y += 7;

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("intervencion").value,
            170
        ),
        15,
        y
    );

    y += 25;

    pdf.text("Estado Final:", 15, y);

    y += 7;

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("estadoFinal").value,
            170
        ),
        15,
        y
    );

    y += 25;

    pdf.text("Observaciones:", 15, y);

    y += 7;

    pdf.text(
        pdf.splitTextToSize(
            document.getElementById("observaciones").value,
            170
        ),
        15,
        y
    );

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

    if (
        fotoGeneral ||
        fotoInicial ||
        fotoIntervencion ||
        fotoFinal
    ) {

        pdf.addPage();

        let imgY = 20;

        if (fotoGeneral) {

            pdf.text(
                "Foto General",
                15,
                imgY
            );

            imgY += 5;

            pdf.addImage(
                fotoGeneral,
                "JPEG",
                15,
                imgY,
                80,
                60
            );

            imgY += 70;
        }

        if (fotoInicial) {

            pdf.text(
                "Estado Inicial",
                15,
                imgY
            );

            imgY += 5;

            pdf.addImage(
                fotoInicial,
                "JPEG",
                15,
                imgY,
                80,
                60
            );

            imgY += 70;
        }

        if (fotoIntervencion) {

            pdf.text(
                "Intervencion",
                15,
                imgY
            );

            imgY += 5;

            pdf.addImage(
                fotoIntervencion,
                "JPEG",
                15,
                imgY,
                80,
                60
            );

            imgY += 70;
        }

        if (fotoFinal) {

            pdf.addPage();

            pdf.text(
                "Estado Final",
                15,
                20
            );

            pdf.addImage(
                fotoFinal,
                "JPEG",
                15,
                25,
                80,
                60
            );
        }
    }

    pdf.save("Guia_Mantenimiento.pdf");
}