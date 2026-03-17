import SwiftUI

struct ContentView: View {
    @State private var count: Int = 0

    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "iphone")
                .font(.system(size: 60))
                .foregroundStyle(.blue)

            Text("Simple iOS App")
                .font(.title)
                .bold()

            Text("Button tapped \(count) time\(count == 1 ? "" : "s")")
                .foregroundStyle(.secondary)

            Button("Tap Me") {
                count += 1
            }
            .buttonStyle(.borderedProminent)

            Button("Reset") {
                count = 0
            }
            .buttonStyle(.bordered)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
