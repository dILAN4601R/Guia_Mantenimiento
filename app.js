document
    .getElementById("btnGenerar")
    .addEventListener(
        "click",
        generarPDF
    );


// =========================
// CONTADOR
// =========================

function obtenerConsecutivo() {

    let numero =
        parseInt(
            localStorage.getItem(
                "contadorPDF"
            )
        ) || 1;

    localStorage.setItem(
        "contadorPDF",
        numero + 1
    );

    return (
        "N" +
        String(numero).padStart(
            4,
            "0"
        )
    );

}


// =========================
// FECHA Y HORA
// =========================

window.onload = function () {

    const ahora =
        new Date();

    const fecha =
        ahora.getFullYear() +
        "-" +
        String(
            ahora.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            ahora.getDate()
        ).padStart(2, "0");

    const hora =
        String(
            ahora.getHours()
        ).padStart(2, "0") +
        ":" +
        String(
            ahora.getMinutes()
        ).padStart(2, "0");

    document.getElementById(
        "fecha"
    ).value = fecha;

    document.getElementById(
        "hora"
    ).value = hora;

};


// =========================
// LEER IMAGEN
// =========================

function leerImagen(input) {

    return new Promise(
        (resolve) => {

            if (
                !input ||
                !input.files ||
                input.files.length === 0
            ) {

                resolve(null);
                return;

            }

            const reader =
                new FileReader();

            reader.onload =
                function (e) {

                    resolve(
                        e.target.result
                    );

                };

            reader.readAsDataURL(
                input.files[0]
            );

        }
    );

}



// =========================
// REPUESTOS DINAMICOS
// =========================

let contadorRepuestos = 0;


document
    .getElementById(
        "btnAgregarRepuesto"
    )
    .addEventListener(
        "click",
        agregarRepuesto
    );


function agregarRepuesto() {

    contadorRepuestos++;

    const contenedor =
        document.getElementById(
            "contenedorRepuestos"
        );

    const tarjeta =
        document.createElement(
            "div"
        );

    tarjeta.className =
        "repuesto";

    tarjeta.id =
        "repuesto_" +
        contadorRepuestos;

    tarjeta.innerHTML = `

        <h3>
            REPUESTO ${contadorRepuestos}
        </h3>

        <label>
            Nombre del repuesto
        </label>

        <input
            type="text"
            class="nombreRepuesto">

        <label>
            Foto del repuesto
        </label>

        <input
            type="file"
            class="fotoRepuesto"
            accept="image/*">

        <button
            type="button"
            class="btnEliminarRepuesto">

            🗑 Eliminar Repuesto

        </button>

    `;

    contenedor.appendChild(
        tarjeta
    );

    tarjeta
        .querySelector(
            ".btnEliminarRepuesto"
        )
        .addEventListener(
            "click",
            function () {

                tarjeta.remove();

            }
        );

}
// =====================================
// GENERAR PDF
// =====================================

async function generarPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const consecutivo =
        obtenerConsecutivo();

    const fotoGeneral =
        await leerImagen(
            document.getElementById(
                "fotoSerie"
            )
        );

    const fotoInicial =
        await leerImagen(
            document.getElementById(
                "fotoInicial"
            )
        );

    const fotoIntervencion =
        await leerImagen(
            document.getElementById(
                "fotoIntervencion"
            )
        );

    const fotoFinal =
        await leerImagen(
            document.getElementById(
                "fotoFinal"
            )
        );

    let y = 20;

    pdf.setFontSize(20);

    pdf.text(
        "GUIA DE MANTENIMIENTO",
        105,
        y,
        {
            align: "center"
        }
    );

    y += 10;

    pdf.setFontSize(14);

    pdf.text(
        consecutivo,
        105,
        y,
        {
            align: "center"
        }
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
        `Hora: ${document.getElementById("hora").value}`,
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
            document.getElementById(
                "estadoInicial"
            ).value,
            170
        );

    pdf.text(
        textoInicial,
        15,
        y
    );

    y +=
        (textoInicial.length * 6) + 5;

    if (fotoInicial) {

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
            document.getElementById(
                "intervencion"
            ).value,
            170
        );

    pdf.text(
        textoIntervencion,
        15,
        y
    );

    y +=
        (textoIntervencion.length * 6) + 5;

    if (fotoIntervencion) {

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

    if (y > 230) {

        pdf.addPage();

        y = 20;

    }

    // ==========================
    // REPUESTOS DINAMICOS
    // ==========================

    const repuestos =
        document.querySelectorAll(
            ".repuesto"
        );

    for (let i = 0; i < repuestos.length; i++) {

        const nombre =

            repuestos[i]
            .querySelector(
                ".nombreRepuesto"
            )
            .value;

        const foto =

            await leerImagen(

                repuestos[i]
                .querySelector(
                    ".fotoRepuesto"
                )

            );

        if (y > 180) {

            pdf.addPage();

            y = 20;

        }

        pdf.setFontSize(14);

        pdf.text(
            `REPUESTO ${i + 1}`,
            15,
            y
        );

        y += 8;

        pdf.setFontSize(11);

        pdf.text(
            `Nombre: ${nombre}`,
            15,
            y
        );

        y += 8;

        if (foto) {

            pdf.addImage(
                foto,
                "JPEG",
                35,
                y,
                140,
                100
            );

            y += 110;

        }

    }
        // ==========================
    // ESTADO FINAL
    // ==========================

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
            document.getElementById(
                "estadoFinal"
            ).value,
            170
        );

    pdf.text(
        textoFinal,
        15,
        y
    );

    y +=
        (textoFinal.length * 6) + 5;

    if (fotoFinal) {

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


    // ==========================
    // OBSERVACIONES
    // ==========================

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
            document.getElementById(
                "observaciones"
            ).value,
            170
        );

    pdf.text(
        observaciones,
        15,
        y
    );

    y +=
        (observaciones.length * 6) + 10;


    // ==========================
    // FOTO GENERAL
    // ==========================

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
            35,
            y,
            140,
            100
        );

    }


    // ==========================
    // GUARDAR PDF
    // ==========================

    pdf.save(
        `${consecutivo}_Guia_Mantenimiento.pdf`
    );

}
