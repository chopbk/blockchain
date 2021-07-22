## Block chain

Là một chuỗi có chứa thông tin được bảo mật bởi mã hóa
Trong một khối thì sẽ thường có chứa đoạn Hash của khối trước đó và một số thông tin của khối.
![Blockchain](https://images.viblo.asia/0964828f-6179-4060-af11-f5ca3dd6d4f5.png)

Blockchain có đặc điểm

- tính độc lập và mở rộng
- tính bất biến
- tính phân tán

## Giao dịch

Trong mạng block chain, Mỗi thành phần trong mạng (ví) thường sẽ có một public key vs một private key. Public key được sử dụng để làm địa chỉ giao dịch trong mạng. các giao dịch hoạt động dựa trên nguyên lý mã hóa public key cùng với phương pháp đào. Về bản chất, phương pháp đào là thêm các khối (block) mới vào chuỗi blockchain thông qua giải quyết bài toán mã hóa tương ứng

Ví dụ Alice muốn gửi trả Mana 2 bitcoin. Alice sẽ cần lấy private-key để tạo một chữ ký số. Chữ ký số cùng với địa chỉ của Mana, số lượng bitcoin muốn chuyển tạo thành 1 thông điệp được mã hóa. Thông điệp này sẽ được gửi tới tất cả các node xử lý trong mạng. => các node giải mã thông điệp để có được nội dung giao dịch
Các node xác nhận thông điệp và nhận được 1 khối băm từ thông điệp trên
=> Bài toán đặt ra cho thợ đào: Khối thêm vào phải chứ mã hash của khối trước cộng với data và mã hash của khối mới phải hcuws 1 lượng bit 0 đủ lớn
Ví dụ: input 00000d3ae2ac43b66283cf0c89636..... Khối dữ liệu sẽ được thêm vào số nonce, các node sẽ phải tìm ra số nonce để thỏa mãn input
![Blockchain](https://images.viblo.asia/2729772e-4c92-4740-8c2f-45c3b37bfdeb.png)
https://www.codehub.com.vn/Xay-dung-mot-Blockchain-don-gian-bang-Javascript

## Mã Hóa

Mã hóa là phương pháp biến thông tin từ định dạng bình thường sang định dạng không thể đọc được nếu không có phương pháp giải mã phù hợp

Mã hóa bao gồm các thành phần

- Thông tin trước khio mã hóa (`plaintext`)
- Thông tin sau khi mã hóa (`Ciphertext`)
- Chìa khóa (`key`)
- Phương pháp giải mã (`Encryption/Decryption`)

Quá trình mã hóa được tiến hành bằng cách sử dụng các hàm toán học `Encryption` lên thông tin `Plaintext`, vốn được biểu diễn dưới dạng số, để trở thành thông tin mã hóa `Ciphertext`
