document
.getElementById("btnGenerar")
.addEventListener("click", generarPDF);

async function generarPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(18);
    pdf.text("GUIA DE MANTENIMIENTO", 20, y);

    y += 15;

    pdf.setFontSize(12);

    pdf.text(
        "Fecha: " +
        document.getElementById("fecha").value,
        20,
        y
    );

    y += 10;

    pdf.text(
        "Tecnico: " +
        document.getElementById("tecnico").value,
        20,
        y
    );

    y += 10;

    pdf.text(
        "Tipo mantenimiento: " +
        document.getElementById("tipoMantenimiento").value,
        20,
        y
    );

    y += 10;

    pdf.text(
        "Tipo maquina: " +
        document.getElementById("tipoMaquina").value,
        20,
        y
    );

    y += 10;

    pdf.text(
        "Equipo: " +
        document.getElementById("nombreEquipo").value,
        20,
        y
    );

    y += 10;

    pdf.text(
        "Serie: " +
        document.getElementById("serie").value,
        20,
        y
    );

    y += 15;

    pdf.text(
        "Estado Inicial:",
        20,
        y
    );

    y += 8;

    pdf.text(
        document.getElementById("estadoInicial").value,
        20,
        y
    );

    y += 20;

    pdf.text(
        "Intervencion:",
        20,
        y
    );

    y += 8;

    pdf.text(
        document.getElementById("intervencion").value,
        20,
        y
    );

    y += 20;

    pdf.text(
        "Estado Final:",
        20,
        y
    );

    y += 8;

    pdf.text(
        document.getElementById("estadoFinal").value,
        20,
        y
    );

    y += 20;

    pdf.text(
        "Observaciones:",
        20,
        y
    );

    y += 8;

    pdf.text(
        document.getElementById("observaciones").value,
        20,
        y
    );

    pdf.save("Guia_Mantenimiento.pdf");
}