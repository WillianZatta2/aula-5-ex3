
function tirarFoto() {
    navigator.camera.getPicture(onSuccess, onFail,
				{ quality: 50,
	destinationType: Camera.DestinationType.DATA_URL,
	sourceType: Camera.PictureSourceType.CAMERA,
     });
}

function onSuccess(imageData) {
    var image = document.getElementById('foto');
    image.src = "data:image/jpeg;base64," + imageData;
    enviarImagemParaServidor(imageData);
}

function onFail(message) {
    alert('Failed because: ' + message);
} 


function enviarImagemParaServidor(imageData) {
    var xhr = new XMLHttpRequest();
    var url = 'upload.php'; 

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    var data = 'imagem=' + encodeURIComponent(imageData);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Sucesso
                alert('Imagem enviada com sucesso!');
            } else {
                // Erro
                alert('Erro ao enviar a imagem.');
            }
        }
    };
    xhr.send(data);
}



// API == EXEMPLO


// <?php
// // Configurações do banco de dados
// $servername = "localhost";
// $username = "root";
// $password = ""; // substitua pela sua senha
// $dbname = "nome_do_banco"; // substitua pelo nome do seu banco de dados

// // Conectando ao banco de dados
// $conn = new mysqli($servername, $username, $password, $dbname);

// // Verificando a conexão
// if ($conn->connect_error) {
//     die("Falha na conexão: " . $conn->connect_error);
// }

// // Checando se a imagem foi enviada
// if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['imagem'])) {
//     $imageData = $_POST['imagem'];
    
//     // Remove o prefixo base64 e decodifica
//     $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
//     $imageData = base64_decode($imageData);
    
//     // Define o diretório de upload
//     $uploadDir = 'imagens/';
    
//     // Cria o diretório se não existir
//     if (!is_dir($uploadDir)) {
//         mkdir($uploadDir, 0755, true);
//     }

//     // Define o nome do arquivo
//     $fileName = uniqid() . '.jpg'; // Gera um nome único para evitar sobreposição
//     $filePath = $uploadDir . $fileName;
    
//     // Salva a imagem
//     if (file_put_contents($filePath, $imageData)) {
//         // Insere o caminho da imagem no banco de dados
//         $stmt = $conn->prepare("INSERT INTO fotos (caminho) VALUES (?)");
//         $stmt->bind_param("s", $filePath);
        
//         if ($stmt->execute()) {
//             echo "Imagem enviada e registrada com sucesso!";
//         } else {
//             echo "Erro ao registrar a imagem no banco de dados.";
//         }
        
//         $stmt->close();
//     } else {
//         echo "Falha ao salvar a imagem.";
//     }

//     // Fecha a conexão
//     $conn->close();
// } else {
//     echo "Nenhuma imagem enviada.";
// }
// ?>
