import Foundation
import PDFKit
import Vision
import AppKit

guard CommandLine.arguments.count > 1, let document = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1])) else {
  fatalError("PDF tidak dapat dibuka")
}

for pageIndex in 0..<document.pageCount {
  guard let page = document.page(at: pageIndex) else { continue }
  let bounds = page.bounds(for: .mediaBox)
  let scale: CGFloat = 2.0
  let width = Int(bounds.width * scale)
  let height = Int(bounds.height * scale)
  guard let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { continue }
  context.setFillColor(NSColor.white.cgColor)
  context.fill(CGRect(x: 0, y: 0, width: width, height: height))
  context.saveGState()
  context.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: context)
  context.restoreGState()
  guard let image = context.makeImage() else { continue }

  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.recognitionLanguages = ["id-ID", "en-US"]
  request.usesLanguageCorrection = true
  try VNImageRequestHandler(cgImage: image).perform([request])
  let lines = (request.results ?? []).sorted {
    if abs($0.boundingBox.midY - $1.boundingBox.midY) > 0.01 { return $0.boundingBox.midY > $1.boundingBox.midY }
    return $0.boundingBox.minX < $1.boundingBox.minX
  }.compactMap { $0.topCandidates(1).first?.string }
  print("\n=== PAGE \(pageIndex + 1) ===")
  print(lines.joined(separator: "\n"))
}
